const chai = require("chai");
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

const Report = require("../src/models/Report");

describe("Report", function () {
  describe("Method get date", function () {
    let newReport = new Report({
      Notification: { message: "falta" },
      idProduct: 4,
      idProvider: 8,
      idUser: 9,
      date: 21,
    });

    let getDate = newReport.getDate();

    it("Get Date", function () {
      assert.equal(getDate, 21);
    });

    it("The result is a Number", function () {
      assert.typeOf(getDate, "number");
    });
  });
});
