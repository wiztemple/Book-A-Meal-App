import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('API to POST order', () => {
  it('should return 201 for a successful post', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .send({
        id: 1,
        mealId: 1,
        timeOrdered: 12.45,
        orderedBy: 1,
        receivedBy: 1,
        quantity: 2,
        totalPrice: 3333,
      })
      .end((err, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Order was successfully made');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('API to GET all orders', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .get('/api/v1/order')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('API to update order', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .put('/api/v1/order/1')
      .send({
        mealId: 1,
        quantity: 3,
      })
      .end((err, response) => {
        expect(response.body.message).to.equal('Order updated successfully');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status').equal('Success');
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('it should return 200 if successful', (done) => {
    chai.request(app)
      .put('/api/v1/order/1')
      .send({
        mealId: 10,
        quantity: 3,
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
describe('API to delete order', () => {
  it('should return 200 if an order was successfully deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/order/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return 404 if parameter is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/order/50')
      .end((error, response) => {
        expect(response).to.have.status(404);
        done();
      });
  });
});
