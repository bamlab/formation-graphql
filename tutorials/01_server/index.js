const express = require('express');
const bodyParser = require('body-parser');
const { apolloExpress, graphiqlExpress } = require('apollo-server');
const schema = require('./schema');

const PORT = 3000;

const app = express();

app.use('/graphql', bodyParser.json(), apolloExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT);
