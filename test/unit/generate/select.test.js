var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('SELECT statements', function() {
    it('should generate a select * query', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'books'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from books',
            bindings: []
          }
        ]
      }, done);
    });

    it('should generate a select query using defined columns', function(done) {
      Test({
        query: {
          select: ['title', 'author', 'year'],
          from: 'books'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   title, author, year from books',
            bindings: []
          }
        ]
      }, done);
    });

    it('should generate a select query using aliased columns', function(done) {
      Test({
        query: {
          select: ['title as book_title', 'author as book_author', 'year as book_year'],
          from: 'books'
        },
        outcomes: [
          {
            dialect: 'postgresql',
            sql: 'select   title as book_title, author as book_author, year as book_year from books',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
