# --- Builder Image ---
FROM --platform=linux/amd64 node:22-slim AS builder

WORKDIR /app

# Install dependencies first to leverage Docker layer caching
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy remaining source code
COPY . .

# Generate Prisma client (safe in builder)
RUN yarn prisma generate

# Build NestJS
RUN yarn build

# --- Production Image for App Runner ---
FROM --platform=linux/amd64 node:22-alpine AS prod

WORKDIR /app

# Add dumb-init for signal handling
RUN apk add --no-cache dumb-init

# Copy only necessary artifacts from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV PORT=3000

# AWS App Runner expects the process to listen on PORT env var
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
