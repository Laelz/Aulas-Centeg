FROM node:24-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM base AS development
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM development AS devcontainer
RUN apk add --no-cache bash git openssh-client

FROM base AS build
RUN npm run build

FROM nginx:stable-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
