var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('SUM statements', function() {
    it('should generate a sum query', function(done) {
      Test({
        query: {
          sum: 'active',
          from: 'users'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   sum(active) from users',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
