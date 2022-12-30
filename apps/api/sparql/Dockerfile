ARG VERSION

FROM khonsu03/now-services-core-builder:$VERSION AS builder

FROM node:19-alpine3.16

WORKDIR /app

# Make sure node env is set to production
RUN export NODE_ENV=production

# Expose the port
EXPOSE 9109

# Start the service
CMD node apps/api/sparql/dist/main.js

# Copy compiled application & libraries
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/
COPY --from=builder /app/libs /app/libs/
COPY --from=builder /app/apps/api/sparql/dist /app/apps/api/sparql/dist/
COPY --from=builder /app/apps/api/sparql/package.json /app/apps/api/sparql/

# Install only api-sparql application workspace
RUN sed -i 's/"apps\/\**"/"apps\/\api\/\sparql"/g' /app/package.json

# Install dependencies & workspaces
RUN npm install --production --no-audit --silent
