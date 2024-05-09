FROM node:20
WORKDIR /src
COPY package*.json .
RUN npm install
RUN npm start
EXPOSE 8080