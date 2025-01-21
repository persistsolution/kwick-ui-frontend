# Use the official Bun image as a base image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json, bun.lockb, and tsconfig.json
COPY package.json bun.lockb tsconfig.json ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application files (including TypeScript source code)
COPY . .

# Build the TypeScript project
RUN bun build

# Expose the application port (5173)
EXPOSE 5173

# Command to start the app on port 5173
CMD ["sh", "-c", "bun run serve -l ${PORT:-5173}"]
