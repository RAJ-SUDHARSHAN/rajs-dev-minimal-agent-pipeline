# Use Node.js 20 (matching runtime requirement) with Alpine for smaller size
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for build (if needed)
RUN apk add --no-cache libc6-compat

# Copy package files for better layer caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy application source
COPY . .

# Build Next.js application with standalone output
# Ensure next.config.js has: output: 'standalone'
RUN npm run build

# Production stage - minimal runtime image
FROM node:${NODE_VERSION}-alpine AS runner

# Install wget for health checks
RUN apk add --no-cache wget

# Set production environment variables
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Make port configurable via ARG
ARG PORT=3000
ENV PORT=${PORT}

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy standalone output from builder (includes minimal node_modules)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE ${PORT}

# Add health check for container orchestration (Fargate)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/ || exit 1

# Add metadata labels
LABEL maintainer="your-team@example.com"
LABEL version="1.0"
LABEL description="Next.js application optimized for AWS Fargate"

# Use standalone server (created by Next.js build)
CMD ["node", "server.js"]