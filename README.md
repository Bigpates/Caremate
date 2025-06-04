# Caremate

This project contains static files for a simple web prototype. A small Node-based development setup is included so you can run a local server and add future tests.

## Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or higher recommended)

## Installing dependencies
Run the following command in the project directory to install development dependencies:

```bash
npm install
```

## Running the development server
You can launch a local server that reloads when files change using:

```bash
npm start
```

This uses [live-server](https://github.com/tapio/live-server) to serve `index.html` on a local port and automatically open it in your browser.

## Running tests
A placeholder test suite is set up with [Jest](https://jestjs.io/). To run the tests:

```bash
npm test
```

Currently there is a simple sample test in `test/sample.test.js` which can be expanded as the project grows.
