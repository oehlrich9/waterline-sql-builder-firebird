var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('LEFT JOINS ::', function() {
    it('should generate a basic left join query', function(done) {
      Test({
        query: {
          select: ['users.id', 'contacts.phone'],
          from: 'users',
          leftJoin: [
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
            sql: 'select   users.id, contacts.phone from users left join contacts on users.id = contacts.user_id',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
