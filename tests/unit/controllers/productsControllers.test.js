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

      const response = { id: 1, name: 'Martelo de Thor' }
      
      sinon.stub(productsService, "getById").resolves(response);
     
      const req = { params: { id: '1' } }
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productsControllers.getById(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith(response);
    
    })
    it('Se cadastra novo produto com status 201', async function () {

      const createdProduct = { id: 1, name: 'laço de héstia' };

      const res = {};
      const req = { body: { createdProduct } }
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.create(req, res);

      expect(res.st)
      
    });
  })
  afterEach(function () {
    sinon.restore();
  });
})