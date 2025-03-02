# Use the official Node.js image
FROM node:19-alpine AS build

# Set the working directory
WORKDIR /app

# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install
RUN npm run build --prod


# Use Nginx to serve the app
FROM nginx:alpine

# Copy the built app to the Nginx HTML directory
COPY --from=build /app/dist/crowdown /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8084
EXPOSE 8084

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]