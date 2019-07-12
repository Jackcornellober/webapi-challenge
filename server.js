const express = require('express'); 

const projectsRouter = require('./data/helpers/projects-router.js');

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`);

  next();
}

server.use(logger);

server.use(express.json());

server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send(`
  <h2>Lambda Prawjex API</h2>
  <p>Welcome to the Lambda Prawjex API</p>
  `);
});

server.use(errorHandler);

function errorHandler(error, req, res, next) {
  console.log(error);
  res.status(401).json({ you: 'Thats an error buddy' });
}

module.exports = server;