var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('UNION ALL statements', function() {
    it('should generate a UNION ALL query', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            and: [
              {
                firstName: 'Bob'
              }
            ]
          },
          unionAll: [
            {
              select: ['*'],
              from: 'users',
              where: {
                and: [
                  {
                    lastName: 'Smith'
                  }
                ]
              }
            },
            {
              select: ['*'],
              from: 'users',
              where: {
                and: [
                  {
                    middleName: 'Allen'
                  }
                ]
              }
            }
          ]
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: '(select   * from users where firstName = ?) union all (select   * from users where lastName = ?) union all (select   * from users where middleName = ?)',
            bindings: ['Bob', 'Smith', 'Allen']
          }
        ]
      }, done);
    });
  });
});
