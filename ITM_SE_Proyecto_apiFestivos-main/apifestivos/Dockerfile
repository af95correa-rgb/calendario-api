# Imagen base con Node LTS, versión liviana
FROM node:18-alpine
# Carpeta de trabajo dentro del contenedor
WORKDIR /app
# Copiamos primero solo los archivos de dependencias
# (esto aprovecha el cache de Docker: si no cambian, no reinstala todo)
COPY package*.json ./
# Instalamos dependencias de producción
RUN npm install --production
# Copiamos el resto del código fuente
COPY . .
# Puerto en el que escucha la app (informativo, no abre el puerto por sí solo)
EXPOSE 3030
# Comando con el que arranca el contenedor
CMD ["node", "app.js"]
