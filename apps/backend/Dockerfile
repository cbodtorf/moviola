FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/backend .
COPY package.json yarn.* ./
ENV PORT=3333
EXPOSE ${PORT}
RUN yarn install --production --omit=dev --ignore-scripts
# dependencies that fastify needs
RUN yarn add reflect-metadata tslib rxjs fastify
CMD node ./main.js