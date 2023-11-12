FROM node:lts-alpine3.15

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY src ./src
COPY tsconfig.json ./
COPY .env.production ./.env

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
