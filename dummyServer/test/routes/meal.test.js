import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('API to POST meal', () => {
  it('Return 409 for existing meal title', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        mealTitle: 'Strawberries',
        description: 'Fruity delicacy',
        price: 1000,
        imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal('Fail');
        done();
      });
  });
  it('Return 201 for a successful post', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        id: 5,
        mealTitle: 'Oha',
        description: 'Fruity delicacy',
        price: 1000,
        imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Meal added successfully');
        done();
      });
  });
  it('Return 400 for post without mealTitle', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        id: 5,
        mealTitle: '',
        description: 'Fruity delicacy',
        price: 1000,
        imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Bad Request');
        done();
      });
  });
});
 
describe('API to GET all meals', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .get('/api/v1/meals')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('API to update meal', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .put('/api/v1/meals/1')
      .send({
        mealTitle: 'Strawberries',
        description: 'Fruity delicacy',
        price: 1000,
        imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Meal updated successfully');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').equal('Success');
        done();
      });
  });
  it('Return 200 if successful', (done) => {
    chai.request(app)
      .put('/api/v1/meals/1')
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
describe('API to delete meal', () => {
  it('Return 200 for succesful delete', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Return 404 if parameter is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/50')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
