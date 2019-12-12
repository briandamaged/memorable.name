FROM node:12
# Note: This needs to be executed relative to the root directory
#       of the lerna project

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN chown -R node: /usr/src
USER node

RUN npm install && npx lerna bootstrap

WORKDIR /usr/src/app/packages/backend

RUN npm run build

EXPOSE 3000

CMD npm start 
