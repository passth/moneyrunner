FROM node:22-alpine
WORKDIR /app

ARG PASSTHROUGH_SDK_URL
ENV PASSTHROUGH_SDK_URL=$PASSTHROUGH_SDK_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:client
RUN npm run build:server

EXPOSE 9000
CMD ["npm", "run", "server"]
