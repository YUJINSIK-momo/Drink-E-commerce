import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./prisma/prisma.module"
import { ProductsModule } from "./products/products.module"
import { OrdersModule } from "./orders/orders.module"
import { HealthController } from "./health/health.controller"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
