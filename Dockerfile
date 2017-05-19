FROM mhart/alpine-node:6

COPY . /code

EXPOSE  8080

WORKDIR /code
RUN npm install --production

CMD ["npm", "start"]
