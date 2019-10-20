FROM node:12

WORKDIR /opt/cion

RUN apt-get install && apt-get update

COPY package*.json /opt/cion

RUN npm install 

COPY . /opt/cion

CMD ["npm","start"]