var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('AVG statements', function() {
    it('should generate a avg query', function(done) {
      Test({
        query: {
          avg: 'active',
          from: 'users'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   avg(active) from users',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
