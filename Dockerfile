# NodeJS Version 16
FROM node:20.12-bullseye-slim

# Copy Dir
COPY . ./app

# Work to Dir
WORKDIR /app

# Install Node Package
RUN npm install

ENV JWT_SECRET_KEY = jwt_secret_key_super_secret
ENV USERS_PASSWORD_SALT = jwt_password_salt_super_secret

EXPOSE 3000

# Cmd script
CMD npm run start