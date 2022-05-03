var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('GROUP BY statements', function() {
    it('should generate a group by query', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          groupBy: 'count'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users group by count',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
