ARG VERSION

FROM khonsu03/now-services-core-builder:$VERSION AS builder

FROM node:16.13.1-alpine

WORKDIR /app

# Make sure node env is set to production
RUN export NODE_ENV=production

# Expose the port
EXPOSE 9106

# Start the service
CMD node apps/daemons/sync/dist/main.js

# Copy compiled application & libraries
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/
COPY --from=builder /app/libs /app/libs/
COPY --from=builder /app/apps/daemons/sync/dist /app/apps/daemons/sync/dist/
COPY --from=builder /app/apps/daemons/sync/package.json /app/apps/daemons/sync/

# Install only daemon-sync application workspace
RUN sed -i 's/"apps\/\**"/"apps\/\daemons\/\sync"/g' /app/package.json

# Install dependencies & workspaces
RUN npm install --production --no-audit --silent
