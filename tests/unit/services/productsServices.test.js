const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { products } = require('../mocksData');


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

    it('Cadastrando novo produto com sucesso', async function () {
      const nameProduct = { id: 1, name: 'lapis' }
      const result = {
        status: 201,
        item: {
          id: 1,
          name:'lapis',
        }
      }

      sinon.stub(productsModel, "create").resolves(nameProduct);
      sinon.stub(productsModel, 'getAll').resolves(products);
    
      const response = await productsService.create(nameProduct);

      expect(response).to.be.deep.equal(result);
    });

    this.afterEach(function () {
      sinon.restore();
    })
  })
})