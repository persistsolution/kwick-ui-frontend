# Use the latest Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency files and install dependencies
COPY package.json bun.lockb tsconfig.json ./
RUN bun install

# Copy the application source code
COPY . .

# Build the application with Bun
RUN bun build ./src/main.tsx --outdir=dist

# Expose the port for the application
EXPOSE 5177

# Start the application in production mode
CMD ["bun", "run", "dist/main.js"]
