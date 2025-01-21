# Use the official Node.js v20 image
FROM node:20

# Set working directory
WORKDIR /app

# Install Bun package manager
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Copy package.json and bun.lockb to install dependencies first (to leverage Docker caching)
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install --no-cache

# Copy the rest of the app files
COPY . .

# Build the React app (specify the entry point and output directory)
RUN bun build ./src/main.tsx --outdir=./dist  # Specify the output directory for the build files

# Expose the port the app runs on
EXPOSE 5177

# Start the app with Bun
CMD ["bun", "dev", "--port", "5177"]
