var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('Grouping statements with AND', function() {
    it('should generate a query when an AND statement is used as an array', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            and: [
              {
                firstName: 'foo'
              },
              {
                lastName: 'bar'
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users where firstName = ? and lastName = ?',
            bindings: ['foo', 'bar']
          }
        ]
      }, done);
    });

    it('should generate a query when a nested OR statement is used', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            and: [
              {
                or: [
                  {
                    firstName: 'John'
                  },
                  {
                    lastName: 'Smith'
                  }
                ]
              },
              {
                or: [
                  {
                    qty: {
                      '>': 100
                    }
                  },
                  {
                    price: {
                      '<': 10.01
                    }
                  }
                ]
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firbird',
            sql: 'select   * from users where (firstName = ? or lastName = ?) and (qty > ? or price < ?)',
            bindings: ['John', 'Smith', '100', '10.01']
          }
        ]
      }, done);
    });
  });
});
