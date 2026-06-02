# Drink E-commerce — 백엔드 MVP

프론트엔드(`../`)의 하드코딩 상품 데이터를 **실제 DB + API**로 대체하는 1차 백엔드.
NestJS 10 + Prisma 6 + PostgreSQL 16.

> 범위(MVP): **상품 조회 + 주문 생성**. 인증·결제·검색·큐·멀티셀러 어드민은 의도적으로 제외했고,
> 메인 포트폴리오의 "Drink 백엔드 아키텍처" 페이지에 **확장 로드맵**으로 표기한다.

## API 엔드포인트

| Method | Path | 설명 |
|---|---|---|
| GET | `/health` | 헬스체크 (DB 연결 포함) |
| GET | `/api/products` | 상품 목록 (`?category=fruits\|vegetables`) |
| GET | `/api/products/:slug` | 상품 상세 |
| POST | `/api/orders` | 주문 생성 — 서버가 가격 검증·계산 |
| GET | `/api/orders/:id` | 주문 조회 |

`POST /api/orders` 요청 예시:

```json
{ "items": [{ "productId": "fruits1-1", "quantity": 2 }], "customerEmail": "a@b.com" }
```

> 가격은 **클라이언트를 신뢰하지 않고 서버가 DB 가격으로 재계산**한다(세일가 우선). 주문 시점 가격은 `OrderItem.unitPrice` 에 스냅샷으로 저장된다.

## 로컬 실행

### 방법 1 — Docker로 Postgres 띄우기 (권장)

```bash
docker compose up -d                 # 로컬 PostgreSQL 기동
cp .env.example .env                 # DATABASE_URL 이 docker-compose 와 맞춰져 있음
npm install
npx prisma migrate dev --name init   # 테이블 생성
npm run seed                         # 주스 7종 시드
npm run start:dev                    # http://localhost:3000
```

### 방법 2 — Docker 없이 무료 클라우드 DB (Neon/Supabase)

1. [Neon](https://neon.tech) 또는 [Supabase](https://supabase.com) 에서 무료 PostgreSQL 생성
2. 연결 문자열을 `.env` 의 `DATABASE_URL` 에 붙여넣기
3. 위와 동일하게 `migrate dev → seed → start:dev`

확인:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/products
```

## 배포 (Render 무료 + Neon 무료)

1. **DB**: Neon에서 PostgreSQL 생성 → 연결 문자열 복사
2. **API**: Render → New + → Blueprint → 이 저장소 선택 (`render.yaml` 자동 인식)
   - 환경변수 `DATABASE_URL` 에 Neon 연결 문자열 입력
   - `CORS_ORIGINS` 에 프론트 주소(`https://yujinsik-momo.github.io`) 입력
   - 빌드 시 `prisma migrate deploy` 가 자동 실행됨
3. 배포 후 시드(최초 1회): Render Shell 또는 로컬에서 `DATABASE_URL=<Neon> npm run seed`

## 프론트엔드 연결

프론트 루트(`../`)의 `.env` 에 API 주소를 넣으면 정적 데이터 대신 이 API를 사용한다.
**비워두면 자동으로 `products.ts` 정적 데이터로 폴백** → GitHub Pages 데모는 백엔드 없이도 항상 동작한다.

```env
VITE_API_BASE_URL=https://<your-app>.onrender.com
```

## 확장 로드맵 (아키텍처 페이지 기준, 미구현)

- JWT 인증 / 권한 분리
- Toss 결제 + Webhook (서명 검증 · 멱등)
- RabbitMQ 비동기 후처리 (Outbox · DLQ · 멱등 · 백오프)
- Elasticsearch 검색 색인
- Redis 캐시 / 세션
- S3 + CloudFront 이미지 파이프라인
- 판매자·MD 어드민 (멀티셀러)
