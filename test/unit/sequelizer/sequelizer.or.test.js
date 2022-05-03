var Sequelizer = require('../../../index')({ dialect: 'postgres' }).sequelizer;
var analyze = require('../../support/analyze');
var assert = require('assert');

describe('Sequelizer ::', function() {
  describe('Grouping statements with OR', function() {
    it('should generate a query when an OR statement is used', function() {
      var tree = analyze({
        select: ['*'],
        where: {
          or: [
            {
              id: { '>': 10 }
            },
            {
              name: 'Tester'
            }
          ]
        },
        from: 'users'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   * from users where id > ? or name = ?');
      assert.deepEqual(result.bindings, ['10', 'Tester']);
    });

    it('should generate a query when nested OR statements are used', function() {
      var tree = analyze({
        select: ['*'],
        where: {
          or: [
            {
              or: [
                { id: 1 },
                { id: { '>': 10 } }
              ]
            },
            {
              name: 'Tester'
            }
          ]
        },
        from: 'users'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   * from users where (id = ? or id > ?) or name = ?');
      assert.deepEqual(result.bindings, ['1', '10', 'Tester']);
    });

    it('should generate a query when complex OR statements are used', function() {
      var tree = analyze({
        select: ['*'],
        where: {
          or: [
            {
              and: [
                {
                  firstName: {
                    like: '%user0%'
                  }
                },
                {
                  type: 'or test'
                }
              ]
            },
            {
              and: [
                {
                  firstName: {
                    like: '%user1'
                  }
                },
                {
                  age: {
                    '>': 0
                  }
                },
                {
                  type: 'or test'
                }
              ]
            }
          ]
        },
        from: 'users'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   * from users where (firstName like ? and type = ?) or (firstName like ? and age > ? and type = ?)');
      assert.deepEqual(result.bindings, ['%user0%', 'or test', '%user1', '0', 'or test']);
    });

    it('should generate a query when complex OR statements are used with IN', function() {

      var tree = analyze({
        select: ['*'],
        where: {
          and: [{
            inviteStatus: 'pending'
          }, {
            or: [{
              entityId: 1,
              inviteType: 'globalAdmin'
            }, {
              entityId: { in : [1] },
              inviteType: 'localAdmin'
            }]
          }]
        },
        from: 'users'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   * from users where inviteStatus = ? and ((entityId = ? and inviteType = ?) or (entityId in (?) and inviteType = ?))');
      assert.deepEqual(result.bindings, ['pending', '1', 'globalAdmin', '1', 'localAdmin']);
    });

    it('should generate a query when complex OR statements are used with NOT IN', function() {

      var tree = analyze({
        select: ['*'],
        where: {
          and: [{
            inviteStatus: 'pending'
          }, {
            or: [{
              entityId: 1,
              inviteType: 'globalAdmin'
            }, {
              entityId: { nin : [1] },
              inviteType: 'localAdmin'
            }]
          }]
        },
        from: 'users'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   * from users where inviteStatus = ? and ((entityId = ? and inviteType = ?) or (entityId not in (?) and inviteType = ?))');
      assert.deepEqual(result.bindings, ['pending', '1', 'globalAdmin', '1', 'localAdmin']);
    });

    it('should generate a query when complex multi-level nesting OR statements are used', function() {
      var tree = analyze({
        select: ['*'],
        where: {
          or: [
            {
              and: [
                {
                  lastName: 'smith'
                },
                {
                  or: [
                    {
                      age: {
                        '<=': 7
                      }
                    },
                    {
                      type: 'even'
                    }
                  ]
                }
              ]
            },
            {
              and: [
                {
                  lastName: 'jones'
                },
                {
                  or: [
                    {
                      type: 'odd'
                    },
                    {
                      firstName: {
                        like: '%6%'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        from: 'users'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   * from users where (lastName = ? and (age <= ? or type = ?)) or (lastName = ? and (type = ? or firstName like ?))');
      assert.deepEqual(result.bindings, ['smith', 7, 'even', 'jones', 'odd', '%6%']);
    });

    it('should generate a query when complex even more multi-level nesting OR statements are used', function() {
      var tree = analyze({
        select: ['*'],
        where: {
          or: [
            {
              and: [
                {
                  lastName: 'smith'
                },
                {
                  or: [
                    { age: { '<=': 7 } },
                    { type: 'even' }
                  ]
                }
              ]
            },
            {
              and: [
                {
                  lastName: 'jones'
                },
                {
                  or: [
                    {
                      type: 'odd'
                    },
                    {
                      and: [
                        {
                          firstName: { like: '%6%' }
                        },
                        {
                          firstName: { like: '%nested' }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        from: 'users'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   * from users where (lastName = ? and (age <= ? or type = ?)) or (lastName = ? and (type = ? or (firstName like ? and firstName like ?)))');
      assert.deepEqual(result.bindings, ['smith', 7, 'even', 'jones', 'odd', '%6%', '%nested']);
    });

    it('should generate a query when complex even more super duper multi-level nesting OR statements are used', function() {
      var tree = analyze({
        select: ['*'],
        where: {
          or: [
            {
              and: [
                {
                  lastName: 'smith'
                },
                {
                  or: [
                    { age: { '<=': 7 } },
                    { type: 'even' }
                  ]
                }
              ]
            },
            {
              and: [
                {
                  lastName: 'jones'
                },
                {
                  or: [
                    {
                      type: 'odd'
                    },
                    {
                      and: [
                        {
                          firstName: {
                            like: '%6%'
                          }
                        },
                        {
                          or: [
                            { age: 1 },
                            { age: { '<': 2 } }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        from: 'users'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   * from users where (lastName = ? and (age <= ? or type = ?)) or (lastName = ? and (type = ? or (firstName like ? and (age = ? or age < ?))))');
      assert.deepEqual(result.bindings, ['smith', 7, 'even', 'jones', 'odd', '%6%', 1, 2]);
    });
  });
});
