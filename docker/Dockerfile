FROM node:lts-alpine3.15

WORKDIR /usr/src/app

COPY src ./src
COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY .env.production ./.env

RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["yarn", "start:prod"]
