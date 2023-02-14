const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');


describe('Camada Service', function () {
  describe('Lista todos os produtos', function () {
    it('Testa funcao getAll', async function () {
      sinon.stub(productsModel, "getAll").resolves(["products"]);
      const response = await productsService.getAll();
      expect(response).to.be.deep.equal(["products"]);
    })
    this.afterEach(function () {
      sinon.restore();
    })

    it('Buscando produtos pelo id', async function () {
      sinon.stub(productsModel,"getById").resolves(["productId"]);
      const response = await productsService.getById();
      expect(response).to.be.deep.equal(["productId"]);
    })
    this.afterEach(function () {
      sinon.restore();
    })
  })
})