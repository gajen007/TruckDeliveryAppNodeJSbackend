# ---- Base image ----
FROM node:20-alpine

# ---- Working directory ----
WORKDIR /app

# ---- Install dependencies first (better layer caching) ----
COPY package*.json ./
RUN npm install --omit=dev

# ---- Copy the rest of the app source ----
COPY . .

# ---- Expose the port this app listens on ----
EXPOSE 3000

# ---- Start the Express server ----
# Change "index.js" to your actual entry file (e.g. server.js, app.js)
CMD ["node", "index.js"]
