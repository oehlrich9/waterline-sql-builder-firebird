var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('WHERE NOT EQUAL statements', function() {
    it('should generate a query with a WHERE NOT EQUAL statement', function(done) {
      Test({
        query: {
          select: ['id'],
          from: 'users',
          where: {
            and: [
              {
                firstName: {
                  '!=': 'Test'
                }
              },
              {
                lastName: {
                  '!=': 'User'
                }
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   id from users where firstName != ? and lastName != ?',
            bindings: ['Test', 'User']
          }
        ]
      }, done);
    });

    it('should generate a query when nested WHERE NOT statements are used', function(done) {
      Test({
        query: {
          select: '*',
          from: 'users',
          where: {
            or: [
              {
                or: [
                  {
                    id: {
                      '!=': 1
                    }
                  },
                  {
                    id: {
                      '<': 10
                    }
                  }
                ]
              },
              {
                name: {
                  '!=': 'Tester'
                }
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users where (id != ? or id < ?) or name != ?',
            bindings: ['1', '10', 'Tester']
          }
        ]
      }, done);
    });

    it('should generate a query when multiple operators are used', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            or: [
              { name: 'John' },
              {
                votes: { '>': 100 },
                title: {
                  '!=': 'Admin'
                }
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   * from users where name = ? or (votes > ? and title != ?)',
            bindings: ['John', '100', 'Admin']
          }
        ]
      }, done);
    });

    it('should generate a query when an AND array is used', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            and: [
              {
                name: 'John'
              },
              {
                title: {
                  '!=': 'Admin'
                }
              }
            ]
          }
        },
        outcomes: [
          {
            dialect: 'firbird',
            sql: 'select   * from users where name = ? and title != ?',
            bindings: ['John', 'Admin']
          }
        ]
      }, done);
    });
  });
});
