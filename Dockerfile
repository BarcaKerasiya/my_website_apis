# Use an official Node.js runtime as the base image
FROM node:alpine3.18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
# COPY . .

# Expose the port on which the app will run
# EXPOSE 4000

# Command to run the application
# CMD ["npm", "run", "start"]





# Copy compiled JavaScript files and other necessary files
COPY dist/ ./dist/
# COPY .env ./

EXPOSE 5000

CMD [ "node", "dist/index.js" ]

