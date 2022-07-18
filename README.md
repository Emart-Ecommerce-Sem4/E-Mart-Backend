# EMart - Single Vendor E-Commerce Platform

![GitHub language count](https://img.shields.io/github/languages/count/Team-Accident/frontend)
![GitHub top language](https://img.shields.io/github/languages/top/Team-Accident/frontend)
![GitHub repo size](https://img.shields.io/github/repo-size/Team-Accident/frontend)

EMart is a online ecommerce tool that helps customers to buy items. This repository contains the backend for the ecommerce web application which you can find
in [here](https://github.com/Team-Accident/E-Mart-Frontend). 

## Technologies used
- expressjs (for the server implementation)
- postgres (database)
- jwttokens (for user authroization)

## Setup instructions
- Clone the repository
- Create a .env file at the root of the project
- Add the following environmental variables
~~~js
DATABASE_NAME="YOUR_DATABASE_NAME"
DATABASE_USER="YOUR_DATABASE_USERNAME"
DATABASE_USER_PASSWORD="YOUR_DATABASE_PASSWORD"
DATABASE_HOST="HOST_URL_OF_THE_DATABASE"
DATABASE_PORT=DATABASE_PORT
TOKEN_SECRET="SECRET_TOKEN_KEY_FOR_JWT"
TOKEN_EXPIRE_TIME="JWT_TOKEN_EXPIRE_TIME"
~~~
- As well as you need to add the ssl certificate file to the src/configs/ssl with the name of certificate.crt.pem
- After completing the above steps you need to execute the `npm i` command
- Then finally execute `node index.js` command
