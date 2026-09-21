FROM node:20-alpine

# Install Docker CLI to execute docker run calls from inside the container
RUN apk add --no-cache docker-cli

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:prod"]
