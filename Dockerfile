FROM node:18
RUN npm install
RUN npm start
CMD ["node", "index.js"]
EXPOSE 8080