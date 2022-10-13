FROM node:17

WORKDIR /var/www/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

RUN npm install pm2 -g

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["pm2", "start", "index.js"]