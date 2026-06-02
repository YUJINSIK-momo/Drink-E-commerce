import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common"
import { ProductsService } from "./products.service"

const CATEGORIES = ["fruits", "vegetables"] as const
type Category = (typeof CATEGORIES)[number]

@Controller("products")
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  // GET /api/products?category=fruits
  @Get()
  findAll(@Query("category") category?: string) {
    if (category && !CATEGORIES.includes(category as Category)) {
      throw new BadRequestException(`category는 fruits 또는 vegetables 여야 합니다.`)
    }
    return this.products.findAll(category as Category | undefined)
  }

  // GET /api/products/:slug
  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.products.findBySlug(slug)
  }
}
