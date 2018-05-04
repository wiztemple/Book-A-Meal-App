import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('API to POST meal', () => {
  it('should return 409 for existing meal title', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        mealTitle: 'Strawberries',
        description: 'Fruity delicacy',
        price: 1000,
        imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
      })
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body.status).to.equal('Fail');
        done();
      });
  });

  it('should return 201 for a successful post', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        id: 5,
        mealTitle: 'Oha',
        description: 'Fruity delicacy',
        price: 1000,
        imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Meal added successfully');
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return 400 for post without mealTitle', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        id: 5,
        mealTitle: '',
        description: 'Fruity delicacy',
        price: 1000,
        imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Bad Request');
        done();
      });
  });
});

describe('API to GET all meals', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .get('/api/v1/meals')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
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
      .end((error, response) => {
        expect(response.body.message).to.equal('Meal updated successfully');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status').equal('Success');
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return 200 if successful', (done) => {
    chai.request(app)
      .put('/api/v1/meals/1')
      .send({
        id: 2,
        mealTitle: '',
        description: 'Fruity delicacy',
        price: 1000,
        imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('API to delete meal', () => {
  it('should return 200 for succesful delete', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/1')
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should return 404 if parameter is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/50')
      .end((error, response) => {
        expect(response).to.have.status(404);
        done();
      });
  });
});
