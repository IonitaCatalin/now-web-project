ARG VERSION

FROM khonsu03/now-services-core-builder:$VERSION AS builder

FROM node:16.13.1-alpine

WORKDIR /app

# Expose the port
EXPOSE 9107

# Copy compiled application & libraries

COPY --from=builder /app/libs/auth /app/libs/auth/
COPY --from=builder /app/libs/common /app/libs/common/
COPY --from=builder /app/libs/sparql /app/libs/sparql/
COPY --from=builder /app/libs/tools /app/libs/tools/
COPY --from=builder /app/libs/users /app/libs/users/

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/tsconfig.json /app/
COPY --from=builder /app/jest.config.js /app/

COPY --from=builder /app/apps/api/sparql/dist /app/apps/api/sparql/dist/
COPY --from=builder /app/apps/api/sparql/package.json /app/apps/api/sparql/

# Install only api-client application workspace
RUN sed -i 's/"apps\/\**"/"apps\/api\/sparql"/g' /app/package.json

# Install dependencies & workspaces
RUN npm install --production --no-audit 

# Start the service
CMD node apps/api/sparql/dist/main.js


