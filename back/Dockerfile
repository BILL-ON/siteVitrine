FROM node:21-alpine3.17

COPY package.json .
RUN npm i 

COPY tsconfig.json .
COPY src/ src/
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]