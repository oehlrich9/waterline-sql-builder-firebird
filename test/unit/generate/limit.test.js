var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('LIMIT statements', function() {
    it('should generate a simple query with a LIMIT statement', function(done) {
      Test({
        query: {
          select: ['id'],
          from: 'users',
          limit: 10
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select first ?  id from users',
            bindings: ['10']
          }
        ]
      }, done);
    });
  });
});
