# Use Node 22.11.0 alpine as build image
FROM node:22.11.0-alpine3.19 AS build

# Change the working directory to /build
WORKDIR /build

# Copy the files to the /build directory
COPY . .

# Build dependencies
RUN npm install && npm run build


####################################################
# Build the production image
####################################################

# Use Node 22.11.0 alpine as base image
FROM node:22.11.0-alpine3.19 AS prod

# Change the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json file to the /build directory
COPY package.json ./

# Copy the package-lock.json file to the /build directory
COPY --from=build /build/package-lock.json ./package-lock.json

# Install production dependencies and clean the cache
RUN npm ci --omit=dev && npm cache clean --force

# Install typescript globally

# Copy the dist source code into the container
COPY --from=build /build/dist ./dist

# Document the port that may need to be published
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
