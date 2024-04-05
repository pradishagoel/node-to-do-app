# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js"]
