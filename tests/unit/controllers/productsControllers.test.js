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

    it('Testa Função getAll, se retorna com status 200 e lista de produtos', async function () {

      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.getAll(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith([mock.products]);
    })
    it('Retorna produto por id ', async function () {

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
  })
  afterEach(function () {
    sinon.restore();
  });

  describe('Cadastrando novo produto', async function () {
    
          const res = {};
          const req = {};
    
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

    it('Se cadastra novo produto com status 201 e se retorna json do produto cadastrado', async function () {
      const response = { id: 1, name: 'laço de héstia' }

      req.body = {name: 'laço de héstia'}

      sinon.stub(productsService, 'create').resolves(response.id)

      await productsControllers.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(response);

    });

    it('Alterando o produto', async function () {
      const req = { params: { id: 1 } };
  
      sinon.stub(productsService, 'updateById').resolves();

       await productsControllers.updateById(req, res);

      expect(res.status).to.have.been.calledWith(201);
    })

    it('Removendo o produto', async function () {
      const req = { params: { id: 1 } };

      sinon.stub(productsService, 'remove').resolves({ status: 204});

      await productsControllers.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
    })

    // it('Removendo o produto', async function () {
    //   const req = { params: { id: 1000 } };
    //   // const response = { status: 404, message: 'Product not found' }

    //   sinon.stub(productsService, 'remove').resolves({ status: 404, message:'Product not found' });

    //   await productsControllers.remove(req, res);

    //   expect(res.status).to.have.been.calledOnceWith(404);
    //   // expect(res.json).to.have.been.calledOnceWith(response);
    // })
    
    afterEach(function () {
      sinon.restore();
    });
  })
})
