FROM node:22-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY cloude_storage/package*.json ./cloude_storage/
# Устанавливаем зависимости
RUN npm ci --production=false

# Копируем весь проект
COPY . .
RUN npm install vite@latest --save-dev
# Собираем приложение
RUN npm run build

# Экспонируем порт (по умолчанию Vite использует 5173)
EXPOSE 5173

FROM nginx:stable-alpine

COPY --from=build /app/cloude_storage/dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
# Запускаем приложение
CMD ["nginx", "-g", "daemon off;"]