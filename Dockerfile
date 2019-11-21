FROM node:12.13.0-stretch
WORKDIR /home/projects
COPY package.json package.json
RUN yarn