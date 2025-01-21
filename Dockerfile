# Use Bun as the base image
FROM oven/bun:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json bun.lockb tsconfig.json ./
RUN bun install

# Copy the application source code
COPY . .

# Build the application with the specified entry point
RUN bun build ./src/main.tsx --outdir=dist

# Expose port 5177
EXPOSE 5177

# Start the application
CMD ["bun", "dev", "--port", "5177"]
