var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('LIKE operator ::', function() {
    it('should generate a LIKE query', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            or: [
              {
                name: {
                  like: '%Test%'
                }
              },
              {
                id: {
                  nin: [1, 2, 3]
                }
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users where name like ? or id not in (?, ?, ?)',
            bindings: ['%Test%', '1', '2', '3']
          }
        ]
      }, done);
    });
  });
});
