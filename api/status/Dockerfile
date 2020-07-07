FROM node:12
WORKDIR /index
COPY package.json /index
RUN npm install
COPY . /index
CMD node index.js
EXPOSE 3003
