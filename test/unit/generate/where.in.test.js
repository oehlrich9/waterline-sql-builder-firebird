var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('WHERE IN statements', function() {
    it('should generate a query', function(done) {
      Test({
        query: {
          select: ['name'],
          from: 'users',
          where: {
            and: [
              {
                id: {
                  in: [1, 2, 3]
                }
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   name from users where id in (?, ?, ?)',
            bindings: ['1', '2', '3']
          }
        ]
      }, done);
    });

    it('should generate a query when inside an OR statement', function(done) {
      Test({
        query: {
          select: ['name'],
          from: 'users',
          where: {
            or: [
              {
                id: {
                  in: [1, 2, 3]
                }
              },
              {
                id: {
                  in: [4, 5, 6]
                }
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   name from users where id in (?, ?, ?) or id in (?, ?, ?)',
            bindings: ['1', '2', '3', '4', '5', '6']
          }
        ]
      }, done);
    });
  });
});
