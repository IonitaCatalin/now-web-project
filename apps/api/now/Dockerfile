ARG VERSION

FROM khonsu03/now-services-core-builder:$VERSION AS builder

FROM node:16.13.1-alpine


WORKDIR /app

# Make sure node env is set to production
RUN export NODE_ENV=production

# Expose the port
EXPOSE 9108

# Start the service
CMD node apps/api/mgt/dist/main.js

# Copy compiled application & libraries
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/
COPY --from=builder /app/libs /app/libs/
COPY --from=builder /app/apps/api/mgt/dist /app/apps/api/mgt/dist/
COPY --from=builder /app/apps/api/mgt/package.json /app/apps/api/mgt/

# Install only api-mgt application workspace
RUN sed -i 's/"apps\/\**"/"apps\/\api\/\mgt"/g' /app/package.json

# Install dependencies & workspaces
RUN npm install --production --no-audit --silent
