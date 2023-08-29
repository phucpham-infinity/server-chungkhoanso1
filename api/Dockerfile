FROM node:16-alpine as build-stage

ENV NODE_ENV=production
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build


FROM node:16-alpine as deploy-stage

ENV NODE_ENV=production
WORKDIR /app

COPY --from=build-stage /build/app.js ./
COPY --from=build-stage .env ./
COPY --from=build-stage /templates ./templates
RUN npm install -g pnpm
RUN pnpm init -y
RUN pnpm install mysql
RUN pnpm install knex
RUN tar -czf app.tar.gz .

EXPOSE 3000

CMD ["node", "app.js"]
