var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('FULL OUTER JOINS ::', function() {
    it('should generate a basic full outer join query', function(done) {
      Test({
        query: {
          select: ['users.id', 'contacts.phone'],
          from: 'users',
          fullOuterJoin: [
            {
              from: 'contacts',
              on: {
                users: 'id',
                contacts: 'user_id'
              }
            }
          ]
        },
        outcomes: [
          {
            dialect: 'firebird',
            sql: 'select   users.id, contacts.phone from users full outer join contacts on users.id = contacts.user_id',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
