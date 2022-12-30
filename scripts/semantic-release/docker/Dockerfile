FROM node:19-alpine3.16

WORKDIR /app

# Copy all libs
COPY libs /app/libs/

# Copy all applications
COPY apps /app/apps/

# Copy test folder (for testing-e2e lib)
COPY test/jest /app/test/jest/

# Copy required root files.
COPY package.json package-lock.json tsconfig.json jest.config.js /app/

# Install dependencies & workspaces
RUN npm ci --no-audit --verbose

# Build workspaces
RUN npm run build:workspaces

