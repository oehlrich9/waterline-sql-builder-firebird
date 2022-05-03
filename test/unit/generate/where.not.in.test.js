var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('WHERE NOT IN statements', function() {
    it('should generate a query', function(done) {
      Test({
        query: {
          select: ['name'],
          from: 'users',
          where: {
            and: [
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
            sql: 'select   name from users where id not in (?, ?, ?)',
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
                  nin: [1, 2, 3]
                }
              },
              {
                id: {
                  nin: [4, 5, 6]
                }
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   name from users where id not in (?, ?, ?) or id not in (?, ?, ?)',
            bindings: ['1', '2', '3', '4', '5', '6']
          }
        ]
      }, done);
    });

    it('should generate a query when inside an OR statement with multiple criteria', function(done) {
      Test({
        query: {
          select: ['name'],
          from: 'users',
          where: {
            or: [
              {
                id: {
                  nin: [1, 2, 3]
                },
                age: 21
              },
              {
                id: {
                  nin: [4, 5, 6]
                }
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   name from users where (id not in (?, ?, ?) and age = ?) or id not in (?, ?, ?)',
            bindings: ['1', '2', '3', '21', '4', '5', '6']
          }
        ]
      }, done);
    });
  });
});
