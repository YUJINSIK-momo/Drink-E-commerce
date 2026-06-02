import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { OrdersService } from "./orders.service"
import { CreateOrderDto } from "./dto/create-order.dto"

@Controller("orders")
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  // POST /api/orders — 장바구니 → 주문 생성 (서버가 가격 검증·계산)
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orders.create(dto)
  }

  // GET /api/orders/:id
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orders.findOne(id)
  }
}
