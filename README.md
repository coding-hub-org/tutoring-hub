# TutoringHub

## Set up workspace

Essentially, there are 2 NodeJS projects in this repository. Treat each as its own, with its own commands and its own file structures. 

### Linux

1. `git clone git@github.com:PSUCoders/tutoring-hub.git && cd tutoring-hub`
2. `cd front-end && npm install`
3. `cd ../back-end && npm install`

### Windows (Powershell)

1. `git clone git@github.com:PSUCoders/tutoring-hub.git | cd tutoring-hub/`
2. `cd front-end/ | npm install`
3. `cd ../back-end/ | npm install`

## How to run

This project uses a RESTful NodeJS backend with a ReactJS frontend. To run the project, you must run one instance of the backend and another instance of the frontend.

### Linux

(From the root folder)

`cd back-end && npm start`

(In another instance, from the root folder)

`cd front-end && npm start`


### Windows (Powershell)

(From the root folder)

`cd back-end/ | npm start`

(In another instance, from the root folder)

`cd front-end/ | npm start`