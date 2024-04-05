# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json files first
COPY package*.json ./

# Explicitly set npm registry
RUN npm config set registry https://registry.npmjs.org/

# Clear npm cache and install dependencies
RUN npm cache clean --force && npm install --only=production

# Copy the entire application code to the container
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]