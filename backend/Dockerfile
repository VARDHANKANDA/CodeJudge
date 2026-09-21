FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Compile TypeScript
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
