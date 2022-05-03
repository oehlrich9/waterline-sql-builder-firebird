var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('Subqueries', function() {
    describe('used as scalar values', function() {
      it('should generate a valid query when used inside a SELECT', function(done) {
        Test({
          query: {
            select: ['name', {
              select: ['username'],
              from: 'users',
              where: {
                or: [
                  { status: 'active' },
                  { name: 'John' }
                ]
              },
              as: 'username'
            }, 'age'],
            from: 'accounts'
          },
          outcomes: [
            {
              dialect: 'firebird',
              sql: 'select   name, (select   username from users where status = ? or name = ?) as username, age from accounts',
              bindings: ['active', 'John']
            }
          ]
        }, done);
      });

      it('should generate a valid query when used as a value in a WHERE', function(done) {
        Test({
          query: {
            select: ['name', 'age'],
            from: 'accounts',
            where: {
              and: [
                {
                  username: {
                    select: ['username'],
                    from: 'users',
                    where: {
                      color: 'accounts.color'
                    }
                  }
                }
              ]
            }
          },
          outcomes: [
            {
              dialect: 'firebird',
              sql: 'select   name, age from accounts where username = (select   username from users where color = ?)',
              bindings: ['accounts.color']
            }
          ]
        }, done);
      });
    });
  });
});
