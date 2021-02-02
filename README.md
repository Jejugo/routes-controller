# ms-customer

This microservice performs video streaming to the frontend, it is possible to define the quality of the video based on the parameter informed in the request.

# how to run locally

- clone this repository
- move to root of project `./cd server`
- install the dependencies of API using `npm install`
- the API will be running on port `3000`.

# how to run using docker

- Build the image: `docker build -t ecommerce-service .`
- Run the image on the background: `docker run -d -p 3002:3002  ecommerce-service:latest`
- Or see the terminal by using `docker run -it -p 3002:3002  ecommerce-service:latest`
