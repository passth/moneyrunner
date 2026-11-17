FROM node:26-alpine
RUN apk upgrade --no-cache
WORKDIR /app

ARG PASSTHROUGH_SDK_URL
ENV PASSTHROUGH_SDK_URL=$PASSTHROUGH_SDK_URL

COPY package*.json ./
# npm runs node-gyp for better-sqlite3 on lockfile installs even though it ships
# prebuilt binaries, and this image has no Python or compiler.
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build:client
RUN npm run build:server

EXPOSE 9000
CMD ["npm", "run", "server"]
