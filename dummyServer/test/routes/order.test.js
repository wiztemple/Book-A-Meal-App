import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('API to POST meal', () => {
  it('Return 409 for existing order id', (done) => {
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
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal('Fail');
        done();
      });
  });
  it('Return 201 for a successful post', (done) => {
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
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Your Order was successfully made');
        done();
      });
  });
  it('Return 404 for post without id', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .send({
        id: '',
        mealId: 1,
        timeOrdered: 12.45,
        orderedBy: 1,
        receivedBy: 1,
        quantity: 2,
        totalPrice: 3333,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('id cannot be empty');
        done();
      });
  });
});

describe('API to GET all orders', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .get('/api/v1/order')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('API to update order', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .put('/api/v1/order/1')
      .send({
        id: 2,
        mealId: 1,
        timeOrdered: 12.45,
        orderedBy: 1,
        receivedBy: 1,
        quantity: 2,
        totalPrice: 3333,
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Menu updated successfully');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').equal('Success');
        done();
      });
  });
  it('Return 200 if successful', (done) => {
    chai.request(app)
      .put('/api/v1/order/1')
      .send({
        id: 2,
        mealTitle: '',
        description: 'Fruity delicacy',
        price: 1000,
        imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
describe('API to delete order', () => {
  it('Return 200 for succesful delete', (done) => {
    chai.request(app)
      .delete('/api/v1/order/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Return 404 if parameter is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/order/50')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
