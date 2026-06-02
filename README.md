# U Ma! Fruits — 드링크 E-commerce

100% 국산 과일·채소 주스 커머스 사이트. **프론트엔드(React)** + **백엔드 MVP(NestJS)** 로 구성된 포트폴리오 프로젝트입니다.

- 🌐 라이브 데모: https://yujinsik-momo.github.io/Drink-E-commerce/
- 📦 저장소: https://github.com/YUJINSIK-momo/Drink-E-commerce
- 🌍 다국어: 일본어 · 한국어 · 영어

> **백엔드 없이도 동작합니다.** 프론트엔드는 API가 연결돼 있으면 실제 백엔드를, 없으면 `src/data/products.ts` 정적 데이터를 자동으로 사용합니다(폴백). 그래서 GitHub Pages 데모는 서버 없이도 항상 동작합니다.

---

## 기술 스택

| 구분 | 스택 |
|------|------|
| 프론트엔드 | React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · framer-motion |
| 백엔드 (`server/`) | NestJS 10 · Prisma 6 · PostgreSQL 16 |
| 배포 | 프론트 → GitHub Pages / 백엔드 → Render(예시) + Neon(무료 PostgreSQL) |

## 폴더 구조

```
drink-ecommerce/
├─ src/                  # 프론트엔드
│  ├─ api/client.ts      # API 호출 + 정적 데이터 폴백
│  ├─ pages/             # 화면 (상품목록·상세·장바구니 등)
│  ├─ data/products.ts   # 상품 정적 데이터(폴백/시드 원본)
│  └─ ...
├─ server/               # 백엔드 (NestJS + Prisma)
│  ├─ src/               # products · orders · health 모듈
│  ├─ prisma/            # schema.prisma · seed.ts
│  └─ README.md          # 백엔드 상세 문서
├─ .env.example          # 프론트 환경변수 예시
└─ README.md             # (이 문서)
```

## 사전 준비

- **Node.js 20 이상** (권장 22 LTS) · npm
- 백엔드를 쓸 경우: **PostgreSQL** — 로컬 Docker 또는 [Neon](https://neon.tech)·[Supabase](https://supabase.com) 무료 DB

---

## 1) 프론트엔드

### 설치 & 개발 서버

```bash
npm install
npm run dev          # http://localhost:5173
```

### 환경변수 설정

```bash
cp .env.example .env
```

`.env` 내용:

```env
# 백엔드 API 주소. 비워두면 정적 데이터로 동작한다.
VITE_API_BASE_URL=http://localhost:3000
```

### 빌드

```bash
npm run build        # tsc -b && vite build → dist/
npm run preview      # 빌드 결과 미리보기
```

### 배포 (GitHub Pages)

로컬에서 빌드한 `dist` 를 `gh-pages` 브랜치로 올립니다.

```bash
npm run deploy       # predeploy(=build) 후 gh-pages -d dist
```

> 라이브 사이트가 **실제 백엔드**를 쓰게 하려면, 배포 빌드 전에 `.env` 의 `VITE_API_BASE_URL` 에 배포된 API 주소(예: Render)를 넣어야 합니다.

---

## 2) 백엔드 (`server/`)

상품 조회 · 주문 생성 API. 자세한 내용은 [`server/README.md`](./server/README.md) 참고.

### 설치

```bash
cd server
npm install          # postinstall 로 prisma generate 자동 실행
```

### 환경변수 설정

```bash
cp .env.example .env
```

`server/.env` 내용:

```env
# PostgreSQL 연결 문자열 (Neon / Supabase / 로컬 Docker)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
# 서버 포트 (Render 등은 자동 주입)
PORT=3000
# CORS 허용 오리진 (프론트 주소)
CORS_ORIGINS="http://localhost:5173"
```

### DB 마이그레이션 (Prisma)

PostgreSQL이 준비되고 `DATABASE_URL` 이 설정된 상태에서:

```bash
# 개발: 스키마 변경을 마이그레이션으로 만들고 DB에 반영
npm run prisma:migrate        # = prisma migrate dev (최초엔 --name init 권장)
npx prisma migrate dev --name init

# 배포: 이미 만들어진 마이그레이션만 적용 (스키마 변경 없이)
npm run prisma:deploy         # = prisma migrate deploy

# 시드: 주스 7종을 DB에 채움
npm run seed
```

> 로컬에 PostgreSQL이 없다면 Docker로 즉시 띄울 수 있습니다(아래 "로컬 DB" 참고). Docker도 없다면 Neon 무료 DB의 연결 문자열을 `DATABASE_URL` 에 넣으면 됩니다.

### 빌드 & 실행

```bash
npm run build         # nest build → dist/
npm run start:dev     # 개발(watch) — http://localhost:3000
npm run start:prod    # 프로덕션 (node dist/main)
```

확인:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/products
```

### 로컬 DB (Docker)

```bash
docker compose up -d  # PostgreSQL 16 기동 (.env.example 의 DATABASE_URL 과 일치)
```

---

## 환경변수 한눈에

| 위치 | 변수 | 설명 |
|------|------|------|
| `.env` (프론트) | `VITE_API_BASE_URL` | 백엔드 API 주소. 비우면 정적 데이터 폴백 |
| `server/.env` | `DATABASE_URL` | PostgreSQL 연결 문자열 |
| `server/.env` | `PORT` | 서버 포트 (기본 3000) |
| `server/.env` | `CORS_ORIGINS` | CORS 허용 오리진(콤마 구분) |

> 실제 `.env` 는 커밋하지 않습니다(`.env.example` 만 저장소에 포함). 민감한 키는 프론트에 넣지 않습니다.

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET | `/health` | 헬스체크 (DB 연결 포함) |
| GET | `/api/products` | 상품 목록 (`?category=fruits\|vegetables`) |
| GET | `/api/products/:slug` | 상품 상세 |
| POST | `/api/orders` | 주문 생성 (서버가 가격 검증·계산) |
| GET | `/api/orders/:id` | 주문 조회 |

## 전체 배포 흐름

```
프론트엔드  →  npm run deploy           →  GitHub Pages (gh-pages 브랜치)
백엔드      →  Render (rootDir: server) →  Neon PostgreSQL
              빌드 시 prisma migrate deploy 자동 실행
연결        →  프론트 .env 의 VITE_API_BASE_URL 에 Render 주소 입력 후 재배포
```

## 명령어 요약

| 위치 | 명령어 | 설명 |
|------|--------|------|
| 루트 | `npm run dev` | 프론트 개발 서버 |
| 루트 | `npm run build` | 프론트 빌드 |
| 루트 | `npm run deploy` | GitHub Pages 배포 |
| `server/` | `npm run start:dev` | 백엔드 개발 서버 |
| `server/` | `npm run build` | 백엔드 빌드 |
| `server/` | `npm run prisma:migrate` | DB 마이그레이션(개발) |
| `server/` | `npm run prisma:deploy` | DB 마이그레이션(배포) |
| `server/` | `npm run seed` | 상품 시드 |
