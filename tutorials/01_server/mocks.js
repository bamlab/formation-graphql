const casual = require('casual');
const { MockList } = require('graphql-tools');

module.exports = {
  Author: () => ({
    firstname: () => casual.first_name,
    lastname: () => casual.last_name,
    birthDate: () => casual.date(format = 'YYYY-MM-DD'),
    books: () => new MockList(3),
  }),
  Bammer: () => ({
    firstname: () => casual.first_name,
    lastname: () => casual.last_name,
    birthDate: () => casual.date(format = 'YYYY-MM-DD'),
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
