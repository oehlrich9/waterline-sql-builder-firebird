var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('RETURNING statements', function() {
    it('should generate an returning query', function(done) {
      Test({
        query: {
          insert: {
            title: 'Slaughterhouse Five'
          },
          into: 'books',
          returning: 'author'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'insert into books (title) values (?) returning author',
            bindings: ['Slaughterhouse Five']
          }
        ]
      }, done);
    });

    it('should generate a returning query when using multiple values', function(done) {
      Test({
        query: {
          insert: {
            title: 'Slaughterhouse Five',
            author: 'Kurt Vonnegut'
          },
          into: 'books',
          returning: ['author', 'title']
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'insert into books (author, title) values (?, ?) returning author, title',
            bindings: ['Kurt Vonnegut', 'Slaughterhouse Five']
          }
        ]
      }, done);
    });

    it('should generate an returning query returning all values if possible', function(done) {
      Test({
        query: {
          insert: {
            title: 'Slaughterhouse Five'
          },
          into: 'books',
          returning: '*'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'insert into books (title) values (?) returning *',
            bindings: ['Slaughterhouse Five']
          }
        ]
      }, done);
    });
  });
});
