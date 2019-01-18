FROM mhart/alpine-node AS react

WORKDIR /app

COPY package.json .

RUN yarn

COPY . . 

RUN yarn build

FROM nginx

COPY --from=react /app/build /usr/share/nginx/html