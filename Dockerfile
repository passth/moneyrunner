FROM node:17-alpine
WORKDIR /app

ARG PASSTHROUGH_SDK_URL
ENV PASSTHROUGH_SDK_URL=$PASSTHROUGH_SDK_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run client:prod

EXPOSE 8080
EXPOSE 9000
CMD ["npm", "run", "server"]
