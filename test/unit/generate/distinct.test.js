var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('DISTINCT statements', function() {
    it('should generate a distinct query', function(done) {
      Test({
        query: {
          select: {
            distinct: ['firstName', 'lastName']
          },
          from: 'customers'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   distinct firstName, lastName from customers',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
