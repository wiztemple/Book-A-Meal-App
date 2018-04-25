import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../dummyServer/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('API to POST meal', () => {
  it('Return 409 for existing meal title', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        id: 1,
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
        expect(res.body.message).to.equal('meal added successfully');
        done();
      });
  });
  it('Return 404 meal without mealTitle', (done) => {
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
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Meal title cannot be empty');
        done();
      });
  });
});

