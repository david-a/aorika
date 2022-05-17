FROM node:12-alpine

RUN apk add --no-cache \
      chromium \
      ca-certificates

# This is to prevent the build from getting stuck on "Taking snapshot of full filesystem" https://scully.io/docs/faq/#docker-and-cicd
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /usr/src/aorika
COPY package.json yarn.lock ./
RUN yarn install 

COPY . .
ENV SCULLY_PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
RUN yarn build_prod_scully