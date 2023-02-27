
#select the base image to start from 
FROM node:18.13-alpine3.16 AS pre-build

#set the directory of our application
WORKDIR /app

#copy all of the files from our machine to the image
COPY . /app/

#install all the packages inside package.json
RUN npm i && npm run build

# Stage 2: serve the application with nginx
FROM nginx:1.23.3-alpine

COPY --from=pre-build /app/build /usr/share/nginx/html

COPY --from=pre-build /app/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx","-g","daemon off;"]

