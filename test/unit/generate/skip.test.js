var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('SKIP statements', function() {
    it('should generate a simple query with a SKIP statement', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          skip: 10
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select  skip ? * from users',
            bindings: ['10']
          }
        ]
      }, done);
    });
  });
});
