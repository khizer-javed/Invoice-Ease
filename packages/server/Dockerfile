FROM node:18-alpine
WORKDIR /app
RUN yarn global add nodemon sequelize-cli
COPY . .
RUN yarn install
EXPOSE 4500
CMD ["yarn", "docker-dev"]
