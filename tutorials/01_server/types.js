
module.exports = [`
  schema {
    query: Query
  }
  type Query {
    books: [Book]
    bammers: [Bammer]
    votes: [Vote]
  }
  type Book {
    title: String
    authors: [Author]
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
