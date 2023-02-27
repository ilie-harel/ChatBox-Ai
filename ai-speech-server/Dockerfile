#select the base image to start from 
FROM node:18.13-alpine3.16

#set the directory of our application
WORKDIR /app

#copy all of the files from our machine to the image
COPY . /app/

#install all the packages inside package.json
RUN npm i

# #install the global package ts-node in the image
RUN npm i -g ts-node

ENTRYPOINT npm run prod

EXPOSE 3046