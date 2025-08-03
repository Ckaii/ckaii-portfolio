# nginx/Dockerfile

# Use the official Nginx image
FROM nginx:stable-alpine

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx.conf to the container
COPY nginx.conf /etc/nginx/conf.d/
