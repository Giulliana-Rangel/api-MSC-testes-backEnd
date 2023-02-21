const chai = require("chai");
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { sales, sale } = require('../mocksData');

chai.use(sinonChai);

describe('Camada Controller', function () {
  describe('Testando as funções da tabela sales', function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    it('listando todas as vendas', async function () {

      sinon.stub(salesService, 'getAll').resolves([sales]);
      await salesController.getAll(req,res)
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([sales]);
    });

    it('listando venda pelo saleId', async function () {
      const req = { params: { id: '1' } }
    
      sinon.stub(salesService, 'getById').resolves([[sales[1]]]);
      await salesController.getById(req, res)
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([[sales[1]]]);
    });

    it('Criando nova venda', async function () {
      req.body = {
        "productId": 2,
        "quantity": 60
      }
      const result = {
        "id": 8,
        "itemsSold": [
          {
            "productId": 2,
            "quantity": 60
          },
        ]
      };

      sinon.stub(salesService, 'create').resolves([result.id]);
      await salesController.create(req, res)
      expect(res.status).to.have.been.calledWith(201);

    })
    // it('Atualizando uma venda ', async function () {

    // })
    it('Removendo uma venda ', async function () {
      const req = { params: { id: '1' } }
      sinon.stub(salesService, 'remove').resolves({ status: 204 })
      await salesController.remove(req,res)
      expect(res.status).to.have.been.calledWith(204);
    })

    afterEach(async function () {
      sinon.restore();
    });

  })
})