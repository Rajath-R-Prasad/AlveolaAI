# ==============================================================================
# AlveolaAI Frontend - Multi-Stage Production Dockerfile (Vite + Nginx)
# ==============================================================================

# --- Stage 1: Build static assets with Node.js ---
FROM node:20-alpine AS builder

WORKDIR /app

# Build arguments for Vite environment variables
ARG VITE_API_BASE_URL=""
ARG VITE_GEMINI_API_KEY=""
ARG VITE_APP_TITLE="AlveolaAI"
ARG VITE_APP_VERSION="1.0.0"

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY \
    VITE_APP_TITLE=$VITE_APP_TITLE \
    VITE_APP_VERSION=$VITE_APP_VERSION

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# --- Stage 2: Serve with lightweight Nginx Alpine ---
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (handles SPA routing + API reverse proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://127.0.0.1/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
