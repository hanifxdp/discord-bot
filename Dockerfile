FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm start
CMD ["node", "index.js"]
EXPOSE 8080