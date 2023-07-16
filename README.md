# nodejs-chat-api

## Description

This is a chat application that allows users to chat with each other in real-time. The application is built using Node.js, Express.js, and Socket.io. The application is deployed on Render and can be accessed at https://chat-app-nodejs-suks.onrender.com.

## Table of Contents.

- [Installation](#installation)
- [Usage](#usage)
- [License](#license).
- [Environment Variables](#environment-variables)

## Installation

To install the application, clone the repository and run `yarn` to install the dependencies. The application can be run locally by running `yarn dev`.

## Usage

The application can be accessed at https://nodejs-chat-api.herokuapp.com/. Users can enter a username and a chat room name to join a chat room. Users can then send messages to each other in real-time.

## License

This application is covered under the MIT license.

## Environment Variables

The following environment variables are required to run the application:

- `PORT`: The port on which the application will run.
- `MONGODB_ATLAS_URI`: The URI for the MongoDB database.
- `JWT_SECRET`: The secret key used to sign the JWT tokens.
- `SENDER_EMAIL`: The email address used to send emails.
- `SENDER_EMAIL_PASSWORD`: The password for the email address used to send emails.
- `CLIENT_URL`: The URL for the client application.
