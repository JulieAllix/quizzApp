FROM node:14-alpine@sha256:7bcf853eeb97a25465cb385b015606c22e926f548cbd117f85b7196df8aa0d29

COPY ./backend/ /app/backend
COPY ./webroot/ /app/webroot
COPY ./models/ /app/models

EXPOSE 443/tcp
EXPOSE 80/tcp

ENV NODE_ENV production

WORKDIR /app/backend

RUN yarn --prod

ENTRYPOINT yarn prod
