FROM node:18-alpine
WORKDIR /frontendapp
COPY package*.json .
RUN npm install -f
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]