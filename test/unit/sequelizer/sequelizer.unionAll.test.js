var Sequelizer = require('../../../index')({ dialect: 'postgres' }).sequelizer;
var analyze = require('../../support/analyze');
var assert = require('assert');

describe('Sequelizer ::', function() {
  describe('UNION ALL statements', function() {
    it('should generate a simple query with a UNION statement', function() {
      var tree = analyze({
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
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, '(select   * from users where firstName = ?) union all (select   * from users where lastName = ?) union all (select   * from users where middleName = ?)');
      assert.deepEqual(result.bindings, ['Bob', 'Smith', 'Allen']);
    });
  });
});
