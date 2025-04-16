FROM node:23.8.0-alpine3.20 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

ARG VITE_API_NAME
ENV VITE_API_NAME=$VITE_API_NAME

RUN pnpm build

FROM node:23.8.0-alpine3.20 AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

CMD ["npx", "serve", "-s", "dist"]
