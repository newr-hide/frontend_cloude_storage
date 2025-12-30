FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./

COPY cloude_storage/package*.json ./cloude_storage/

RUN npm ci --production=false

WORKDIR /app/cloude_storage

RUN npm ci --production=false

WORKDIR /app

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/cloude_storage/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
