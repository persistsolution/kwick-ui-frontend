FROM oven/bun:latest

WORKDIR /usr/src/app

# Copy dependency files and install dependencies
COPY package.json bun.lockb tsconfig.json ./
RUN bun install

# Copy the application source code
COPY . .


# Expose port 5177
EXPOSE 5177

# Start the application
CMD ["bun", "dev", "--port", "5177"]
