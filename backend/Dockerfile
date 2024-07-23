# Use the official Node.js image
FROM node:18.16.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 1337

# Install nodemon for hot reloading
RUN npm install -g nodemon

# Start the app with nodemon
CMD ["nodemon", "--watch", ".", "--exec", "npm", "run", "develop"]
