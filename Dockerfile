FROM node:12-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json package-lock.json /usr/app/
RUN npm install --no-optional

COPY . /usr/app

EXPOSE 3000
CMD node .