# NodeJS Version 16
FROM node:20.12-bullseye-slim

# Copy Dir
COPY . ./app

# Work to Dir
WORKDIR /app

# Install Node Package
RUN npm install

EXPOSE 3000

# Cmd script
CMD npm run start