

# Steps

1. create a directory : `mkdir formation-graphql`
1. `npm init` and fill the form
1. `npm install --save apollo-server express body-parser`
1. `touch index.js`
1. copy following code in `index.js`

  ```javascript
  import express from 'express';
  import bodyParser from 'body-parser';
  import { apolloExpress } from 'apollo-server';
  import schema from './schema';

  const PORT = 3000;

  const app = express();
  const parser = bodyParser.json();
  const controller = apolloExpress({ schema });

  app.use('/graphql', parser, controller));

  app.listen(PORT);
  ```

1. `npm install --save graphql graphql-tools`
1. `touch schema.js`
1. copy following code in `schema.js`

  ```javascript
  import {
    buildSchemaFromTypeDefinitions,
    addMockFunctionsToSchema,
  } from 'graphql-tools';
  import types from './types';
  import mocks from './mocks';

  const schema = buildSchemaFromTypeDefinitions(types);
  addMockFunctionsToSchema(schema, mocks);

  export default schema;
  ```

1. `touch types.js`
1. copy following code in `types.js`

  ```javascript
  export default [`
    schema {
      query: Query
    }
    type Query {
      books: [Book]
      bammers: [Bammer]
      vote: [Vote]
    }
    type Book {
      title: string,
      authors: [Author],
      votes: [Vote]
    }
    interface Person {
      firstname: String!
      lastname: String!
      birthDate: String
      votes: [Vote]
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
  import { MockList } from 'graphql-tools';
  export default {
    Author: () => {
      firstname: () => casual.first_name,
      lastname: () => casual.last_name,
      birthdate: () => casual.date(format = 'YYYY-MM-DD'),
      books: () => new MockList(3),
    },
    Bammer: () => {
      firstname: () => casual.first_name,
      lastname: () => casual.last_name,
      birthdate: () => casual.date(format = 'YYYY-MM-DD'),
    },
    Book: () => {
      title: () => casual.title,
      authors: () => new MockList(2),
      vote: () => new MockList(3),
    },
    Vote: () => {
      date: () => casual.date(format = 'YYYY-MM-DD'),
      comment: () => casual.string
    }
  }
  ```
