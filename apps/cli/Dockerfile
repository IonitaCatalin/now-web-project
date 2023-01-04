ARG VERSION

FROM khonsu03/now-services-core-builder:$VERSION AS builder

FROM node:16.13.1-alpine

WORKDIR /app

# Make sure node env is set to production
RUN export NODE_ENV=production

# Expose the port
EXPOSE 9106

# Start the service
CMD node apps/cli/dist/main.js

# Copy compiled application & libraries
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/
COPY --from=builder /app/libs /app/libs/
COPY --from=builder /app/apps/cli/dist /app/apps/cli/dist/
COPY --from=builder /app/apps/cli/package.json /app/apps/cli/

# Install only cli application workspace
RUN sed -i 's/"apps\/\**"/"apps\/\cli"/g' /app/package.json

# Install dependencies & workspaces
RUN npm install --production --no-audit --silent
