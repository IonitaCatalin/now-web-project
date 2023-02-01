ARG VERSION

FROM now-services-core-builder:$VERSION AS builder

FROM node:16.13.1-alpine

WORKDIR /app

EXPOSE 9000

# Copy compiled application & libraries

COPY --from=builder /app/libs/auth /app/libs/auth/
COPY --from=builder /app/libs/common /app/libs/common/
COPY --from=builder /app/libs/sparql /app/libs/sparql/
COPY --from=builder /app/libs/tools /app/libs/tools/
COPY --from=builder /app/libs/users /app/libs/users/
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/

COPY --from=builder /app/tsconfig.json /app/
COPY --from=builder /app/jest.config.js /app/

COPY --from=builder /app/apps/api/now/dist /app/apps/api/now/dist/
COPY --from=builder /app/apps/api/now/package.json /app/apps/api/now/

# Install only api-client application workspace
RUN sed -i 's/"apps\/\**"/"apps\/\api\/\sparql"/g' /app/package.json

# Install dependencies & workspaces
RUN npm install --production --no-audit 

# Start the service
CMD node apps/api/now/dist/main.js


