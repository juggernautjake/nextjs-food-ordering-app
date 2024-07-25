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

# Increase inotify watch limit
RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p

# Expose the port the app runs on
EXPOSE 3000

# Install nodemon for hot reloading
RUN npm install -g nodemon

# Set proper permissions
RUN chmod -R 755 /usr/src/app

# Start the app with nodemon
CMD ["nodemon", "--watch", ".", "--exec", "npm", "run", "dev"]
