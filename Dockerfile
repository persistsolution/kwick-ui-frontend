# Use the latest Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json bun.lockb tsconfig.json ./
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the application (ensure the correct entry point is specified)
RUN bun build ./src/main.tsx --outdir=dist

# Expose port 5177 for the application
EXPOSE 5177

# Start the application on port 5177
CMD ["bun", "run", "dev", "--port", "5177"]
