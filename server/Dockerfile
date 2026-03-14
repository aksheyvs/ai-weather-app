# Use official Node.js slim image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install


# Copy source code
COPY . .

RUN apt-get update && apt-get install -y openssl
RUN npm run prisma-generate

# Build TypeScript
RUN npm run build

# Expose port (change if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]