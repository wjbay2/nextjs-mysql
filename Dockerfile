FROM node:18-slim

WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install 
COPY . .
EXPOSE 3000
CMD pnpm run dev