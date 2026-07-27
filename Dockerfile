FROM node:22-alpine
WORKDIR /app

ARG PASSTHROUGH_SDK_URL
ENV PASSTHROUGH_SDK_URL=$PASSTHROUGH_SDK_URL

COPY package*.json ./
# Material-UI v4 declares React 16/17 peer deps but runs fine on React 18
# (legacy render). --legacy-peer-deps lets the strict `npm ci` accept that.
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build:client
RUN npm run build:server

EXPOSE 9000
CMD ["npm", "run", "server"]
