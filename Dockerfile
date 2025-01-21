# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the application
RUN yarn build

# Expose port
EXPOSE 5177

# Start the application
CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "5177"]
