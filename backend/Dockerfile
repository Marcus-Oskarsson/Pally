FROM node:lts-bullseye-slim
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
