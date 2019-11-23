FROM node:latest

WORKDIR /opt/cion/cion-react-app

RUN apt-get install && apt-get update

COPY package*.json /opt/cion/cion-react-app

RUN npm install 

COPY . /opt/cion/cion-react-app

CMD ["npm","start"]