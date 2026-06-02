import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateOrderDto } from "./dto/create-order.dto"

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    // 1) 같은 상품이 여러 줄로 들어와도 수량을 합산한다.
    const quantityById = new Map<string, number>()
    for (const item of dto.items) {
      quantityById.set(item.productId, (quantityById.get(item.productId) ?? 0) + item.quantity)
    }
    const productIds = [...quantityById.keys()]

    // 2) 실제 존재하는 상품인지 DB에서 확인 (클라이언트 입력을 신뢰하지 않음)
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    })
    if (products.length !== productIds.length) {
      const found = new Set(products.map((p) => p.id))
      const missing = productIds.filter((id) => !found.has(id))
      throw new BadRequestException(`존재하지 않는 상품: ${missing.join(", ")}`)
    }

    // 3) 가격은 서버가 계산한다 — 세일가가 있으면 세일가 적용 (서버 권위적 가격)
    let totalPrice = 0
    const itemsData = products.map((p) => {
      const quantity = quantityById.get(p.id)!
      const unitPrice = p.isSale && p.salePrice != null ? p.salePrice : p.price
      totalPrice += unitPrice * quantity
      return { productId: p.id, unitPrice, quantity }
    })

    // 4) 주문 + 주문항목을 한 번에 생성
    return this.prisma.order.create({
      data: {
        totalPrice,
        customerName: dto.customerName,
        customerEmail: dto.customerEmail,
        items: { create: itemsData },
      },
      include: { items: true },
    })
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    })
    if (!order) {
      throw new NotFoundException(`주문을 찾을 수 없습니다: ${id}`)
    }
    return order
  }
}
