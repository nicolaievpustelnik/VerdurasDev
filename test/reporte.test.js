const chai = require("chai");
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

const Reporte = require("../src/repository/Reporte");

describe("Reporte", function () {
  describe("Metodo get fecha", function () {
    let newReport = new Reporte({
      Notification: { message: "falta" },
      idProducto: 4,
      idProveedor: 8,
      idUsuario: 9,
      fecha: 21,
    });

    let getFecha = newReport.getFecha();

    it("Get fecha", function () {
      assert.equal(getFecha, 21);
    });

    it("El resultado get fecha es number", function () {
      assert.typeOf(getFecha, "number");
    });
  });
});
