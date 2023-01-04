FROM node:16.13.1-alpine

WORKDIR /app

# Copy all libs
COPY libs /app/libs/

# Copy all apps
COPY apps /app/apps/

# Copy scripts
COPY scripts/workspaces /app/scripts/workspaces/

# Copy required root files.
COPY package.json package-lock.json tsconfig.json jest.config.js /app/

# Install dependencies & workspaces
RUN npm ci --no-audit --verbose

COPY node_modules /app/node_modules

# Build workspaces
CMD ["node", "./scripts/workspaces/build.js"]