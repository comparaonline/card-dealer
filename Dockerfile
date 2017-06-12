FROM mhart/alpine-node:8.1
LABEL Name="ComparaOnline Card Dealer" Version="1.0"

EXPOSE  8080

ARG ENVIRONMENT="production"

ENV NODE_ENV=${ENVIRONMENT}

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install

COPY . /code

CMD ["npm", "start"]
