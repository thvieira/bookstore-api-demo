FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy all files
COPY . .

# Expose port 3000
EXPOSE 3000

# Run app
CMD [ "npm", "run", "app" ]