FROM oven/bun:latest

WORKDIR /usr/src/app

# Install dependencies
COPY package.json bun.lockb tsconfig.json ./
RUN bun install

# Copy all project files
COPY . .

# Build the application with an explicit entry point
RUN bun build src/App.tsx

# Expose port
EXPOSE 5177

# Start the application
CMD ["bun", "dev", "--port", "5177"]
