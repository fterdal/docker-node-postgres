# Use Node version 12
FROM node:12

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
