FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:latest as prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000/tcp
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]