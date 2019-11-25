This project (Package Manager [PM]) was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# PACKAGE MANAGER (PM)

It is a single page and mobile friendly web application that provides the dashboard for the manager and the bikers to manage the package. Manager can assign the package to any bikers. Whereas, bikers can set the delivery and pick-up time for the parcels.

## Getting Started

PM was developed using React, Redux and Node. The app has a stand-alone authentication system, so user accessibility can be controlled. The user can select the role as manager or bikers. The functionality of the dashboard depends on the role he/she is accounted. Once the user is logged in, upon reloading the page, he/she gets the same content on the screen, unless logged out.

### Prerequisites

The following web technologies are necessary to run this application

[node.js](https://nodejs.org/en/)<br/>
[git](https://git-scm.com/downloads)

### Installing

From your console (e.g. cmd or GitBash) first clone the repository and enter the app root directory:

```
git clone https://github.com/angsherpa232/manage_parcels.git
cd manage_parcels
```

Install the necessary node modules specified in [package.json] using:

```
npm install
```

Optional: It is recommended to install nodemon so you avoid having to restart the server every time you modify the project. This is very useful during development.

```
npm install nodemon -g
```

## Build (important step)

To build the application, from the root directory, run:

```
npm run build
```

This will create a build directory. Once the app is built, follow the running instructions

## Running

To run the application, from the root directory, run:

```
node server
```

If you use nodemon, run:

```
nodemon server
```

Open your web browser and view the app at `localhost:5000`

## Authentication

As a role of manager, currently only one manager is available
username: john
password: 123

As a role of biker, currently following bikers are available
username: [mike,james,steven,anton,sam,daniel,gil,ang,thomas,david];
password:[mike123,james123,steven123,anton123,sam123,daniel123,gil123,ang123,thomas123,david123]
