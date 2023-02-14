const { expect } = require('chai');
const sinon = require('sinon');

const  productsModel  = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const mock = require('../mocksData');

describe('Products Model', function () {
  describe('Lista todos os produtos', function () {
    it('com sucesso', async function () {
      beforeEach(async function () {

        sinon.stub(connection, 'execute').resolves([mock.products]);
      });
    
      const response =  await productsModel.getAll();
      expect(response).deep.equal(mock.products);

      afterEach(async function () {
        connection.execute.restore();
      });
    });
    
    it('Procurando pelo product id', async function () {
      beforeEach(async function () {
        sinon.stub(connection, 'execute').resolves([mock.products[1]]);
        const response = await productsModel.getById('1');
        expect(response).deep.equal(mock.products[1]);
      });
      
      afterEach(async function () {
        connection.execute.restore();
      });
      
    });
  });
});