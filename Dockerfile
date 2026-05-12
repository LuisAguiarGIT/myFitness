FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy" npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]