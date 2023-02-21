const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/salesModel');
const salesProductsModel = require('../../../src/models/salesProductModel');
const connection = require('../../../src/models/connection');
const { sales, sale } = require('../mocksData');

describe('Camada Model', function () {
  describe('Testando as funções da tabela sales', function () {
    it('listando todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([sales]);
      const response = await salesProductsModel.getAll();
      expect(response).to.be.deep.equal(sales);
    })

    it('listando venda pelo saleId', async function () {
  
        sinon.stub(connection, 'execute').resolves([sales[1]]);
        const response = await salesProductsModel.getById('1');
        expect(response).to.be.deep.equal(sales[1]);
      })
      
    it('Criando nova venda', async function () {
      const entry = [
        {
          "productId": 1,
          "quantity": 1
        },
      ]
      
      sinon.stub(connection, 'execute').resolves([sale]);
      const response = await salesProductsModel.createSalesProduct(entry);
      expect(response).to.be.deep.equal(sale);

    })
    // it('Atualizando uma venda ', async function () {

    // })
    it('Removendo uma venda ', async function () {
      const id = 1;

      sinon.stub(connection, 'execute').resolves([undefined]);
      const response = await salesProductsModel.remove(id);
      expect(response).to.be.deep.equal(undefined);

    })
    afterEach(async function () {
      sinon.restore();
    });

  })// describe 2
}) // describe1