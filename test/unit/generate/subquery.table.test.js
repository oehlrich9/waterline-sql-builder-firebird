var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('Subqueries', function() {
    describe('used as table sub query', function() {
      it('should generate a valid query when used as a value in a FROM with an AS alias', function(done) {
        Test({
          query: {
            select: ['name', 'age'],
            from: {
              select: ['age'],
              from: 'users',
              where: {
                and: [
                  {
                    age: 21
                  }
                ]
              },
              as: 'userage'
            }
          },
          outcomes: [
            {
              dialect: 'firebird',
              sql: 'select   name, age from (select   age from users where age = ?) as userage',
              bindings: [21]
            }
          ]
        }, done);
      });
    });
  });
});
