# Use Node.js 20 Alpine as specified in runtime requirements
# Using specific version tag for reproducibility
ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy application source code
COPY . .

# Build the Next.js application with standalone output
# Standalone output creates a minimal production bundle in .next/standalone
RUN npm run build

# Production runtime stage with minimal footprint
FROM node:${NODE_VERSION} AS runner

# Metadata labels
LABEL maintainer="your-team@example.com"
LABEL description="Next.js application optimized for AWS Fargate"
LABEL version="1.0.0"

# Set production environment variables
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Make port configurable via build arg
ARG PORT=3000
ENV PORT=${PORT}

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install wget for health checks (minimal Alpine package)
RUN apk add --no-cache wget

# Copy only the standalone output (includes minimal node_modules)
# This is significantly smaller than copying full node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Change ownership of application files to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE ${PORT}

# Health check for container orchestration (Fargate)
# Checks if the Next.js server is responding
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/ || exit 1

# Start the Next.js standalone server
# Standalone build creates a server.js file
CMD ["node", "server.js"]