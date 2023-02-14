const chai = require("chai");
const sinon = require('sinon');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');

const productsService = require('../../../src/services/productsService');
const productsControllers = require('../../../src/controllers/productsController');
const mock = require('../mocksData');

chai.use(sinonChai);

describe('Camada Controller', function () {
  describe('Listando os produtos', function () {
    beforeEach(function () {
      sinon.stub(productsService, 'getAll').resolves([mock.products]);
    })

    it('Testa F getAll, se retorna com status 200', async function () {
 
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.getAll(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith([mock.products]);
    })
    it('Retorno por id ', async function () {

      const response = { status:200, product: [mock.products]}
      sinon.stub(productsService, "getById").resolves(response);
      // req.params = '1';
      const { id = '1' } = req.params;

      await productsControllers.getById(req, res);

      expect(res.status).to.have.been.calledOnceWith(response.status);
      expect(res.json).to.have.been.calledWith(response.product);
    
    })
  })
  afterEach(function () {
    sinon.restore();
  });
})