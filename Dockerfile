# Use the Bun base image
FROM oven/bun:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN bun install

# Copy all project files
COPY . .

# Build the application using Vite (instead of specifying an entry point for Bun)
RUN npm run build

# Expose port 5177
EXPOSE 5177

# Start the application
CMD ["bun", "dev", "--port", "5177"]
