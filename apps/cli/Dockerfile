ARG VERSION

FROM khonsu03/now-services-core-builder:$VERSION AS builder

FROM node:16.13.1-alpine

WORKDIR /app

EXPOSE 4001

RUN chown -R node.node /app

# Start the service
CMD node apps/cli/dist/main.js

# Copy compiled application & libraries
COPY --from=builder /app/libs/tools /app/libs/tools/

# Install only cli application workspace
RUN sed -i '/"libs\//d' /app/package.json

# Install dependencies & workspaces
RUN npm install --production --no-audit --silent


