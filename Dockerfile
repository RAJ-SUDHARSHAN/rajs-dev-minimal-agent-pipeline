# Use Node.js 20 LTS as requested (runtime: node20)
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    # Copy node_modules for standalone build
    cp -R node_modules prod_node_modules && \
    # Install all dependencies for build
    npm ci

# Copy application source
COPY . .

# Build Next.js application with standalone output
# Ensure next.config.js has: output: 'standalone'
RUN npm run build

# Production stage with minimal image
FROM node:${NODE_VERSION}-alpine AS runner

# Add metadata labels
LABEL maintainer="your-team@example.com" \
      description="Next.js application" \
      version="1.0" \
      org.opencontainers.image.source="https://github.com/your-org/your-repo" \
      org.opencontainers.image.vendor="Your Organization"

# Install wget for health checks and apply security updates
RUN apk add --no-cache wget && \
    apk upgrade --no-cache

# Configurable port argument
ARG APP_PORT=3000

# Set environment variables (configurable)
ENV NODE_ENV=production \
    HOSTNAME="0.0.0.0" \
    PORT=${APP_PORT} \
    NEXT_TELEMETRY_DISABLED=1

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copy Next.js standalone output (includes minimal dependencies)
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
# Copy static assets
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static
# Copy public directory if exists
COPY --from=builder --chown=appuser:appgroup /app/public ./public

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE ${APP_PORT}

# Add health check for container orchestration (Fargate)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${APP_PORT}/ || exit 1

# Start Next.js standalone server
CMD ["node", "server.js"]