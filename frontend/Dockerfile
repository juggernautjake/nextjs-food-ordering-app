# Use the official Node.js image
FROM node:18.16.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Install nodemon for hot reloading
RUN npm install -g nodemon

# Start the app with nodemon
CMD ["nodemon", "--watch", ".", "--exec", "npm", "run", "dev"]
