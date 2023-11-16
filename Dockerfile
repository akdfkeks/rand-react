FROM node:18-alpine3.17 AS build

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN npm install -g yarn
RUN yarn install

COPY ./ ./

RUN yarn build

FROM nginx
COPY --from=build /usr/app/build /usr/share/nginx/html

ENTRYPOINT ['yarn', 'start:prod']