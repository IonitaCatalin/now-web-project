ARG VERSION

FROM khonsu03/now-services-core-builder:$VERSION AS builder

FROM node:16.13.1-alpine

WORKDIR /app

EXPOSE 9108

RUN chown -R node.node /app

# Copy compiled application & libraries
COPY --from=builder /app/libs/tools /app/libs/tools/
COPY --from=builder /app/libs/common /app/libs/common/
COPY --from=builder /app/libs/auth /app/libs/auth/
COPY --from=builder /app/libs/users /app/libs/users/

# Install only api-client application workspace
RUN sed -i '/"libs\//d' /app/package.json && sed -i 's/"apps\/\**"/"libs\/tools",\n\t\t"libs\/common",\n\t\t"libs\/auth",\n\t\t"libs\/users",\n\t\t"apps\/api\/client"/g' /app/package.json

# Install dependencies & workspaces
RUN npm install --production --no-audit --silent

# Start the service
CMD node apps/api/client/dist/main.js


