FROM node:17-alpine
WORKDIR /app

ARG PASSTHROUGH_SDK_URL
ENV PASSTHROUGH_SDK_URL=$PASSTHROUGH_SDK_URL

RUN npm install pm2 -g

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run client:prod

EXPOSE 8080
EXPOSE 9000
CMD ["pm2", "start", "--no-daemon", "./backend/bin/www"]
