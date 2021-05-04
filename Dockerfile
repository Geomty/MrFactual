# syntax=docker/dockerfile:1
FROM node:12.18.3
WORKDIR /
COPY / /
RUN npm install
CMD ["node", "."]