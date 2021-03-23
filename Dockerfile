FROM node:12.18.1
ENV NODE_ENV=production
EXPOSE port
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

ENTRYPOINT [ "node", "server.js" ]