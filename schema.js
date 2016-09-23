const {
  buildSchemaFromTypeDefinitions,
  addMockFunctionsToSchema,
} = require('graphql-tools');
const types = require('./types');
const mocks = require('./mocks');

const schema = buildSchemaFromTypeDefinitions(types);
addMockFunctionsToSchema({schema, mocks});

module.exports = schema;
