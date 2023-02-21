const { expect } = require('chai');
const sinon = require('sinon');

const salesProductsModel = require('../../../src/models/salesProductModel');
const salesService = require('../../../src/services/salesService');
const { sales, sale } = require('../mocksData');


describe('Camada Services', function () {
  describe('Testando as funções da tabela sales', function () {
    it('listando todas as vendas', async function () {
      sinon.stub(salesProductsModel, 'getAll').resolves(["sales"]);

      const response = await salesService.getAll()

      expect(response).to.be.deep.equal(["sales"]);

    })
    it('listando venda pelo saleId', async function () {
      const id = 3;
      sinon.stub(salesProductsModel, 'getById').resolves(["sale"]);

      const response = await salesService.getById(id);

      expect(response).to.be.deep.equal(["sale"]);

    })
  
    it('Removendo uma venda ', async function () {
      const id = 1;
      const result = { status: 204 };
      sinon.stub(salesProductsModel, 'remove').resolves(['sales']);

      const response = await salesService.remove(id)

      expect(response).to.be.deep.equal(result);
    })
    afterEach(async function () {
      sinon.restore();
    });

  })
})