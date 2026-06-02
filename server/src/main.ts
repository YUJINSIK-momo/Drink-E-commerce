import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // CORS — 프론트엔드(GitHub Pages)와 다른 오리진이므로 명시적으로 허용한다.
  const origins = (process.env.CORS_ORIGINS ?? "http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean)
  app.enableCors({ origin: origins })

  // 모든 라우트에 /api 프리픽스 (헬스체크는 제외)
  app.setGlobalPrefix("api", { exclude: ["health"] })

  // DTO 검증 — 정의되지 않은 필드는 잘라내고, 타입을 변환한다.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const port = Number(process.env.PORT) || 3000
  await app.listen(port)
  console.log(`🚀 Drink API listening on http://localhost:${port}`)
}

void bootstrap()
