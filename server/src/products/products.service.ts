import { Injectable, NotFoundException } from "@nestjs/common"
import { Product } from "@prisma/client"
import { PrismaService } from "../prisma/prisma.service"

type Category = "fruits" | "vegetables"

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: Category) {
    const rows = await this.prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { id: "asc" },
    })
    return rows.map((p) => this.toDto(p))
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } })
    if (!product) {
      throw new NotFoundException(`상품을 찾을 수 없습니다: ${slug}`)
    }
    return this.toDto(product)
  }

  // DB는 영양정보를 평탄하게 저장하지만, 프론트엔드 Product 타입과 동일하게
  // nutrition 을 중첩 객체로 돌려준다. (timestamps 는 응답에서 제외)
  private toDto(p: Product) {
    const { energy, protein, fat, carbs, salt, createdAt, updatedAt, ...rest } = p
    void createdAt
    void updatedAt
    return { ...rest, nutrition: { energy, protein, fat, carbs, salt } }
  }
}
