var Sequelizer = require('../../../index')({ dialect: 'postgres' }).sequelizer;
var analyze = require('../../support/analyze');
var assert = require('assert');

describe('Sequelizer ::', function() {
  describe('UPDATE statements', function() {
    it('should generate a simple query with an UPDATE statement', function() {
      var tree = analyze({
        update: {
          status: 'archived'
        },
        where: {
          and: [
            {
              publishedDate: { '>': 2000 }
            }
          ]
        },
        using: 'books'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'update books set status = ? where publishedDate > ?');
      assert.deepEqual(result.bindings, ['archived', 2000]);
    });

    it('should generate a query with multiple values being inserted', function() {
      var tree = analyze({
        update: {
          status: 'archived',
          active: false
        },
        where: {
          and: [
            {
              publishedDate: {
                '>': 2000
              }
            }
          ]
        },
        using: 'books'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'update books set status = ?, active = ? where publishedDate > ?');
      assert.deepEqual(result.bindings, ['archived', false, 2000]);
    });

    it('should generate a query with a NULL value for input', function() {
      var tree = analyze({
        update: {
          status: null
        },
        using: 'books'
      });

      var result = Sequelizer(tree);
      assert.equal(result.sql, 'update books set status = ?');
      assert.deepEqual(result.bindings, [null]);
    });
  });
});
