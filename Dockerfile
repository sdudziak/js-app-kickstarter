FROM mhart/alpine-node:7.9

RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon typescript tslint jest gulp

ADD . /app
RUN npm install
EXPOSE 8080

CMD ["gulp"]


