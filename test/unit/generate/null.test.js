var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('NULL operator ::', function() {
    describe('IS NULL ::', function() {
      it('should generate a query when a NULL value is used', function(done) {
        Test({
          query: {
            select: ['*'],
            from: 'users',
            where: {
              and: [
                {
                  updatedAt: null
                }
              ]
            }
          },
          outcomes: [
            {
              dialect: 'firebird',
              sql: 'select   * from users where updatedAt is null',
              bindings: []
            }
          ]
        }, done);
      });
    });

    describe('IS NOT NULL ::', function() {
      it('should generate a query when a NOT NULL value is used', function(done) {
        Test({
          query: {
            select: ['*'],
            from: 'users',
            where: {
              and: [
                {
                  not: {
                    updatedAt: null
                  }
                }
              ]
            }
          },
          outcome: 'select   * from "users" where "updatedAt" is not null'
        }, done);
      });
    });
  });
});
