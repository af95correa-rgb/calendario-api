# Imagen oficial de MongoDB
FROM mongo:7.0

# Nombre de la base de datos
ENV MONGO_INITDB_DATABASE=festivos

# Copiar el script de inicializacion
COPY init-festivos.js /docker-entrypoint-initdb.d/init-festivos.js

# Puerto de MongoDB
EXPOSE 27017
