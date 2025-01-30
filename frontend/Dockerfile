# Use Node.js version 18.18.2 as the base image
FROM node:18.18.2-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app runs on
# EXPOSE 

# Define the command to run your app using CMD which runs npm start
CMD ["npm", "run", "start"]
