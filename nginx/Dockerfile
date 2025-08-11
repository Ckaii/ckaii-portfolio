# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app
# Copy package files from the frontend directory
COPY ../frontend/package*.json ./
# Install dependencies
RUN npm ci --silent
# Copy the rest of the frontend source code
COPY ../frontend .
# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
# Copy our custom nginx.conf to the container
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html