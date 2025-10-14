# Multi-stage build for Next.js with standalone output
# Use Node.js 20 LTS (configurable version)
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for optimal layer caching
COPY package*.json ./

# Install production dependencies first, then all dependencies for build
RUN npm ci --only=production && \
    cp -R node_modules prod_node_modules && \
    npm ci

# Copy application source
COPY . .

# Build Next.js application with standalone output
# Requires next.config.js/ts to have: output: 'standalone'
RUN npm run build

# Production stage with minimal Alpine image
FROM node:${NODE_VERSION}-alpine AS runner

# Add comprehensive metadata labels
LABEL maintainer="your-team@example.com" \
      description="Next.js application optimized for AWS Fargate" \
      version="1.0.0" \
      org.opencontainers.image.source="https://github.com/your-org/your-repo" \
      org.opencontainers.image.vendor="Your Organization" \
      org.opencontainers.image.title="Next.js App" \
      org.opencontainers.image.description="Production-ready Next.js standalone deployment"

# Install wget for health checks and apply security updates
# Clean apk cache to reduce image size
RUN apk add --no-cache wget && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/*

# Configurable port and version arguments
ARG APP_PORT=3000
ARG NODE_ENV=production

# Set production environment variables
ENV NODE_ENV=${NODE_ENV} \
    HOSTNAME="0.0.0.0" \
    PORT=${APP_PORT} \
    NEXT_TELEMETRY_DISABLED=1

# Set working directory
WORKDIR /app

# Create non-root user with specific UID/GID for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

# Copy Next.js standalone output with minimal dependencies
# Standalone mode includes only required dependencies automatically
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./

# Copy static assets generated during build
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static

# Copy public directory for static files (if exists)
COPY --from=builder --chown=appuser:appgroup /app/public ./public

# Switch to non-root user for runtime security
USER appuser

# Expose application port (configurable)
EXPOSE ${APP_PORT}

# Health check for container orchestration (AWS Fargate compatible)
# Start period allows time for application initialization
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${APP_PORT}/ || exit 1

# Start Next.js standalone server
# server.js is automatically created by standalone build
CMD ["node", "server.js"]