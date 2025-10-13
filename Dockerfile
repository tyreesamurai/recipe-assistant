# --- build ---
FROM oven/bun:1.3 AS build
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# --- run (tiny runtime) ---
FROM node:20-bookworm AS run
WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

# Don't run as root
USER node
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
