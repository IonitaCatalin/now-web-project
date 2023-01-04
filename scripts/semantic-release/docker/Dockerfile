FROM node:16.13.1-alpine

WORKDIR /app

# Copy all libs
COPY libs /app/libs/

# Copy all applications
COPY apps /app/apps/

# Copy test folder (for testing-e2e lib)
COPY test/jest /app/test/jest/

# Copy scripts file
COPY scripts/workspaces /app/scripts/workspaces/

# Copy required root files.
COPY package.json package-lock.json tsconfig.json jest.config.js /app/

# Install dependencies & workspaces
RUN npm ci --no-audit --verbose

# Build workspaces
RUN node ./scripts/workspaces/build.js 

