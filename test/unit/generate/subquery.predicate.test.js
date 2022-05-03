var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('Subqueries', function() {
    describe('used as a predicate', function() {
      it('should generate a valid query for an IN subquery', function(done) {
        Test({
          query: {
            select: ['*'],
            where: {
              and: [
                {
                  id: {
                    in: {
                      select: ['id'],
                      from: 'users',
                      where: {
                        or: [
                          { status: 'active' },
                          { name: 'John' }
                        ]
                      }
                    }
                  }
                }
              ]
            },
            from: 'accounts'
          },
          outcomes: [
            {
              dialect: 'firebird',
              sql: 'select   * from accounts where id in (select   id from users where status = ? or name = ?)',
              bindings: ['active', 'John']
            }
          ]
        }, done);
      });

      it('should generate a valid query for a NOT IN subquery', function(done) {
        Test({
          query: {
            select: ['*'],
            from: 'accounts',
            where: {
              and: [
                {
                  id: {
                    nin: {
                      select: ['id'],
                      from: 'users',
                      where: {
                        or: [
                          { status: 'active' },
                          { name: 'John' }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          },
          outcomes: [
            {
              dialect: 'firebird',
              sql: 'select   * from accounts where id not in (select   id from users where status = ? or name = ?)',
              bindings: ['active', 'John']
            }
          ]
        }, done);
      });
    });
  });
});
