FROM node:10

# install pm2 globally
RUN yarn global add pm2

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

# build typescript
RUN yarn build:tsc

CMD ["pm2-runtime", "process.yml"]

