FROM node:12-alpine
WORKDIR /app
ADD package.json /app/package.json
RUN yarn install
ADD . /app
EXPOSE 3000
CMD ["yarn", "start"]



