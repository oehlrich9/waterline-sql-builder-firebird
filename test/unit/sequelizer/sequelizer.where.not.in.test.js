var Sequelizer = require('../../../index')({ dialect: 'postgres' }).sequelizer;
var analyze = require('../../support/analyze');
var assert = require('assert');

describe('Sequelizer ::', function() {
  describe('WHERE NOT IN statements', function() {
    it('should generate a query', function() {
      var tree = analyze({
        select: ['name'],
        from: 'users',
        where: {
          and: [
            {
              id: {
                nin: [1, 2, 3]
              }
            }
          ]
        }
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   name from users where id not in (?, ?, ?)');
      assert.deepEqual(result.bindings, ['1', '2', '3']);
    });

    it('should generate a query when used in a conjunction', function() {
      var tree = analyze({
        select: ['name'],
        from: 'users',
        where: {
          and: [
            {
              id: {
                nin: [1, 2, 3]
              },
              age: {
                nin: [30, 40, 50]
              }
            }
          ]
        }
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   name from users where (id not in (?, ?, ?) and age not in (?, ?, ?))');
      assert.deepEqual(result.bindings, ['1', '2', '3', '30', '40', '50']);
    });

    it('should generate a query when in an OR statement', function() {
      var tree = analyze({
        select: ['name'],
        from: 'users',
        where: {
          or: [
            {
              id: {
                nin: [1, 2, 3]
              }
            },
            {
              id: {
                nin: [4, 5, 6]
              }
            }
          ]
        }
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   name from users where id not in (?, ?, ?) or id not in (?, ?, ?)');
      assert.deepEqual(result.bindings, ['1', '2', '3', '4', '5', '6']);
    });

    it('should generate a query when in an OR statement with multiple criteria', function() {
      var tree = analyze({
        select: ['name'],
        from: 'users',
        where: {
          or: [
            {
              and: [
                {
                  id: {
                    nin: [1, 2, 3]
                  }
                },
                {
                  age: 21
                }
              ]
            },
            {
              id: {
                nin: [4, 5, 6]
              }
            }
          ]
        }
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'select   name from users where (id not in (?, ?, ?) and age = ?) or id not in (?, ?, ?)');
      assert.deepEqual(result.bindings, ['1', '2', '3', '21', '4', '5', '6']);
    });
  });
});
