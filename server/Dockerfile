# 멀티스테이지 빌드 — 이미지 경량화 (arch 페이지의 "Docker 멀티스테이지" 항목과 일치)
FROM node:22-slim AS builder
WORKDIR /app
# Prisma 엔진이 OpenSSL을 필요로 함
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
COPY package*.json ./
COPY prisma ./prisma
# prisma 가 dependencies 에 있어 postinstall(prisma generate) + 런타임 migrate deploy 가능
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/dist ./dist
EXPOSE 3000
# 배포 시 마이그레이션을 먼저 반영하고 서버 기동
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
