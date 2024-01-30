# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.41.1-jammy

# Set the work directory for the application
WORKDIR /testing

# COPY the needed files to the app folder in Docker image
COPY package*.json ./

RUN npm ci

COPY . .

# CMD ["npm", "run", "pw:ci"]
