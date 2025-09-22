# --- build ---
FROM node:20-bookworm AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- run (tiny runtime) ---
FROM node:20-bookworm
ENV NODE_ENV=production
WORKDIR /app
# copy only the standalone output
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

# Don't run as root
USER node

# Next’s server.js respects PORT
ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
