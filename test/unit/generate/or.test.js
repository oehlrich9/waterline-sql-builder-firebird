var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('Grouping statements with OR', function() {
    it('should generate a query when an OR statement is present', function(done) {
      Test({
        query: {
          select: ['*'],
          where: {
            or: [
              {
                id: { '>': 10 }
              },
              {
                name: 'Tester'
              }
            ]
          },
          from: 'users'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users where id > ? or name = ?',
            bindings: ['10', 'Tester']
          }
        ]
      }, done);
    });

    it('should generate a query when a nested OR statement is used', function(done) {
      Test({
        query: {
          select: ['*'],
          where: {
            or: [
              {
                or: [
                  { id: 1 },
                  { id: { '>': 10 } }
                ]
              },
              {
                name: 'Tester'
              }
            ]
          },
          from: 'users'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users where (id = ? or id > ?) or name = ?',
            bindings: ['1', '10', 'Tester']
          }
        ]
      }, done);
    });
  });
});
