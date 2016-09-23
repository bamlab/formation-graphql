# Setup
## Manuals Steps

1. create a directory : `mkdir formation-graphql`
1. `npm init` and fill the form
1. `npm install --save apollo-server express body-parser graphql`
1. `touch index.js`
1. copy following code in `index.js` : two rooutes, one for api and the other for the validation graphiQL

  ```javascript
  const express = require('express');
  const bodyParser = require('body-parser');
  const { apolloExpress, graphiqlExpress } = require('apollo-server');
  const schema = require('./schema');

  const PORT = 3000;

  const app = express();

  app.use('/graphql', bodyParser.json(), apolloExpress({ schema }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  app.listen(PORT);

  ```

1. `npm install --save graphql-tools`
1. `touch schema.js`
1. copy following code in `schema.js`

  ```javascript
  const {
    buildSchemaFromTypeDefinitions,
    addMockFunctionsToSchema,
  } = require('graphql-tools');
  const types = require('./types');
  const mocks = require('./mocks');

  const schema = buildSchemaFromTypeDefinitions(types);
  addMockFunctionsToSchema(schema, mocks);

  module.exports = default schema;
  ```

1. `touch types.js`
1. copy following code in `types.js`

  ```javascript
  module.exports = [`
    schema {
      query: Query
    }
    type Query {
      books: [Book]
      bammers: [Bammer]
      vote: [Vote]
    }
    type Book {
      title: String,
      authors: [Author],
      votes: [Vote]
    }
    interface Person {
      firstname: String!
      lastname: String!
      birthDate: String
    }
    type Author implements Person {
      firstname: String!
      lastname: String!
      birthDate: String
      books: [Book]
    }
    type Bammer {
      firstname: String!
      lastname: String!
      birthDate: String
      votes: [Vote]
    }
    enum ANSWER {
      GLAD
      SAD
      MAD
    }
    type Vote {
      book: Book!
      bammer: Bammer!
      answer: ANSWER!
      date: String
      comment: String
    }
  `];
  ```

1. `npm install --save casual`
1. `touch mocks.js`
1. copy following code in `mocks.js`

  ```javascript
  const casual = require('casual');
  const { MockList } = require('graphql-tools');

  module.exports = {
    Author: () => ({
      firstname: () => casual.first_name,
      lastname: () => casual.last_name,
      birthdate: () => casual.date(format = 'YYYY-MM-DD'),
      books: () => new MockList(3),
    }),
    Bammer: () => ({
      firstname: () => casual.first_name,
      lastname: () => casual.last_name,
      birthdate: () => casual.date(format = 'YYYY-MM-DD'),
    }),
    Book: () => ({
      title: () => casual.title,
      authors: () => new MockList(2),
      vote: () => new MockList(3),
    }),
    Vote: () => ({
      date: () => casual.date(format = 'YYYY-MM-DD'),
      comment: () => casual.string
    })
  }
  ```

1. run `node index.js`

## I'm lazy and I clone it

1. run `git clone git@github.com:bamlab/formation-graphql.git`
1. run `node index.js`

# Try  it

1. go to http://localhost:3000/
1. try some queries, for instance :

  ```graphql
  {
    books {
      title
      authors {
        firstname
        birthDate
      }
    }
    vote {
      book {
        title
      }
      bammer {
        firstname
        lastname
      }
      answer
    }
  }
  ```
