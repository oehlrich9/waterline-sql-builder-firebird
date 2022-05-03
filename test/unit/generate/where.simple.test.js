var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('Simple WHERE statements', function() {
    it('should generate a query with a simple WHERE statement', function(done) {
      Test({
        query: {
          select: ['id'],
          where: {
            and: [
              {
                firstName: 'Test'
              },
              {
                lastName: 'User'
              }
            ]
          },
          from: 'users'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   id from users where firstName = ? and lastName = ?',
            bindings: ['Test', 'User']
          }
        ]
      }, done);
    });

    it('should generate a query when operators are used', function(done) {
      Test({
        query: {
          select: ['*'],
          where: {
            and: [
              {
                votes: {
                  '>': 100
                }
              }
            ]
          },
          from: 'users'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users where votes > ?',
            bindings: ['100']
          }
        ]
      }, done);
    });

    it('should generate a query when multiple operators are used', function(done) {
      Test({
        query: {
          select: ['*'],
          where: {
            and: [
              {
                votes: {
                  '>': 100
                }
              },
              {
                votes: {
                  '<': 200
                }
              }
            ]
          },
          from: 'users'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users where votes > ? and votes < ?',
            bindings: ['100', '200']
          }
        ]
      }, done);
    });

    it('should generate a query when multiple columns and operators are used', function(done) {
      Test({
        query: {
          select: ['*'],
          where: {
            and: [
              {
                votes: {
                  '>': 100
                }
              },
              {
                age: {
                  '<': 50
                }
              }
            ]
          },
          from: 'users'
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users where votes > ? and age < ?',
            bindings: ['100', '50']
          }
        ]
      }, done);
    });
  });
});
