# Use a lightweight nginx image
FROM nginx:alpine

# Copy the static frontend files to the nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]