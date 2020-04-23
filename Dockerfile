# Use Node version 12
FROM node:12

COPY . .

# RUN npm install
RUN npm ci

EXPOSE 8080

CMD ["npm", "start"]
