FROM node:lts-bullseye-slim as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-bullseye as production-stage
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist/ .
COPY ./nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
