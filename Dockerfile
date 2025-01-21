# Use the official Bun image as a base image
FROM jarredsumner/bun:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json, bun.lockb, and tsconfig.json
COPY package.json bun.lockb tsconfig.json ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application files (including TypeScript source code)
COPY . .

# Compile TypeScript to JavaScript
RUN bun build

# Expose the application port (dynamic, default 5173)
EXPOSE 5173

# Command to serve the app, dynamically using PORT environment variable
CMD ["sh", "-c", "bun run serve -l ${PORT:-5173}"]
