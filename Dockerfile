## builder
FROM node:18.12.1 AS base
RUN npm install -g pnpm

FROM base AS dependencies
USER node
ADD --chown=node:node ["./package.json", "./pnpm-lock.yaml", "/app/"]
WORKDIR /app
RUN pnpm install

FROM base AS builder
WORKDIR /app
ADD --chown=node:node [".", "/app/"]
COPY --from=dependencies --chown=node:node ["/app/node_modules", "/app/node_modules"]
RUN pnpm build

## runner
FROM nginx:1.23.4-alpine AS runner

# Install scripts
COPY ["./docker/bin/docker-entrypoint", "./docker/bin/docker-healthcheck", "/usr/local/bin/"]
RUN chmod +x /usr/local/bin/docker-entrypoint /usr/local/bin/docker-healthcheck

# Copy html as template so we can replace environment variables on runtime
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/dist/index.html /usr/share/nginx/html/index.tmpl.html

# Copy application configuration
COPY ["./docker/nginx/", "/etc/nginx/"]

# Gogo~
EXPOSE 80 8080
ENTRYPOINT ["docker-entrypoint"]
CMD ["nginx", "-g", "daemon off;"]
HEALTHCHECK --interval=15s --timeout=5s --start-period=15s --retries=2 CMD ["docker-healthcheck"]
