var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('RIGHT OUTER JOINS ::', function() {
    it('should generate a basic right outer join query', function(done) {
      Test({
        query: {
          select: ['users.id', 'contacts.phone'],
          from: 'users',
          rightOuterJoin: [
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
            sql: 'select   users.id, contacts.phone from users right outer join contacts on users.id = contacts.user_id',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
