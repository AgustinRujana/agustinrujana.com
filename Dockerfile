# syntax=docker/dockerfile:1
# agustinrujana.com: static Next.js export served by nginx on Cloud Run.

# ---- build: next build → /app/out ----
FROM node:22-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runtime: unprivileged nginx listening on 8080 ----
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 8080
