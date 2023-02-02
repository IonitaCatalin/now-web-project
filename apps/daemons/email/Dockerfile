ARG VERSION

FROM khonsu03/now-services-core-builder:$VERSION AS builder

FROM node:16.13.1-alpine

WORKDIR /app

EXPOSE 9108

# Copy compiled application & libraries

# Start the service\
COPY --from=builder /app/libs/tools /app/libs/tools/
COPY --from=builder /app/libs/common /app/libs/common/

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/tsconfig.json /app/
COPY --from=builder /app/jest.config.js /app/

COPY --from=builder /app/apps/daemons/email/dist /app/apps/daemons/email/dist/
COPY --from=builder /app/apps/daemons/email/package.json /app/apps/daemons/email/


# Install only daemon/email application workspace
RUN sed -i 's/"apps\/\**"/"apps\/\daemons\/email"/g' /app/package.json

# Install dependencies & workspaces
RUN npm install --production --no-audit 

# Start the service
CMD node apps/daemons/email/dist/main.js

