# TutoringHub

![Example image of Tutoring Hub](http://i.imgur.com/2bgyx0o.png)

## How to run locally

### Pre-requisites
* You must have NodeJS & NPM installed
* You must have enough disk space for the project (~1GB from react libs)
* You must have a mongodb server, either local or hosted works. You can get one for free from [here](https://cloud.mongodb.com/).
* You must have an image CDN to host the tutor images. We use [Cloudinary](https://cloudinary.com/) and the project may not work with other CDNs.

### Setting up the workspace

1. Download the latest version of the repo and enter the directory

2. Run the setup.sh script (works fine bash or batch, powershell soon) or run the following:

#### Bash/Batch

```
git clone git@github.com:PSUCoders/tutoring-hub.git && cd tutoring-hub
cd front-end && npm install
cd ../back-end && npm install
```

#### Powershell

```
git clone git@github.com:PSUCoders/tutoring-hub.git | cd tutoring-hub/
cd front-end/ | npm install
cd ../back-end/ | npm install
```

3. Start the project

This project uses a RESTful NodeJS backend with a ReactJS frontend. To run the project, you must run one instance of the backend and another instance of the frontend. (In other words, 2 terminals)

```bash
# From the root dir
cd backend && npm start
```

```bash
# From the root dir, in another terminal
cd frontend && npm start
```