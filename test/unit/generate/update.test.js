var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('UPDATE statements', function() {
    it('should generate an update query', function(done) {
      Test({
        query: {
          update: {
            status: 'archived'
          },
          where: {
            and: [
              {
                publishedDate: {
                  '>': 2000
                }
              }
            ]
          },
          using: 'books'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'update books set status = ? where publishedDate > ?',
            bindings: ['archived', 2000]
          }
        ]
      }, done);
    });

    it('should generate an update query where order doesn\'t matter', function(done) {
      Test({
        query: {
          where: {
            and: [
              {
                type: 'test'
              }
            ]
          },
          using: 'user',
          update: {
            age: 10
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'update user set age = ? where type = ?',
            bindings: [10, 'test']
          }
        ]
      }, done);
    });

    it('should generate an insert query when using multiple values', function(done) {
      Test({
        query: {
          update: {
            status: 'archived',
            active: false
          },
          where: {
            and: [
              {
                publishedDate: {
                  '>': 2000
                }
              }
            ]
          },
          using: 'books'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'update books set status = ?, active = ? where publishedDate > ?',
            bindings: ['archived', false , 2000]
          }
        ]
      }, done);
    });
  });
});
