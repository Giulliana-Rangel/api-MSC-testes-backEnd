const { expect } = require('chai');
const sinon = require('sinon');

const  productsModel  = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const mock = require('../mocksData');

describe('Products Model', function () {
  describe('Lista todos os produtos', function () {
    it('retorna todos os produtos cadastrados', async function () {
        sinon.stub(connection, 'execute').resolves([mock.products]);
      
      const response =  await productsModel.getAll();
      expect(response).deep.equal(mock.products);

      afterEach(async function () {
        sinon.restore();
      });
    });
    
    it('Procurando pelo product id', async function () {
 
        sinon.stub(connection, 'execute').resolves([[mock.products[1]]]);
        const response = await productsModel.getById('1');
        expect(response).deep.equal(mock.products[1]);
      
      
      afterEach(async function () {
        sinon.restore();
      });
    });
    
      describe('Testa a camada model para a função "create"', function () {
        it('Criando um novo produto', async function () {
          const nameProduct = { id: 1, name: 'lapis'}

          sinon.stub(connection, 'execute').resolves([[nameProduct]]);

          const response = await productsModel.create('lapis');
          expect(response).to.be.deep.equal(undefined);
      
        });
        it('Testa a camada model para a função "update"', function () {
          it('Alterando um produto', async function () {
            const product = { id: 2, name: 'pirulito' }
            
            sinon.stub(connection, 'execute').resolves();

            const response = await productsModel.updateById(id, product);
            expect(response).to.be.equal(undefined);
          })
        })
        
        it('Testa a camada model para a função "remove"', async function () {
          
          const id = 1;
          sinon.stub(connection, 'execute').resolves([undefined]);
          const response = await productsModel.remove(id);
          expect(response).to.be.deep.equal(undefined);
        })

        afterEach(async function () {
          sinon.restore();
        });
    });
  });
});