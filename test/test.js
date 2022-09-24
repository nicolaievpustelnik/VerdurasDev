var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

let Admin = require('../src/models/Admin');

describe("Admin", function () {
  it("should execute method", (function () {

    const newAdmin = new Admin({ firstName: "Nicolaiev", lastName: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "1" });
    assert.equal(newAdmin.getFullName(), "Nicolaiev Brito");
  }));
});

