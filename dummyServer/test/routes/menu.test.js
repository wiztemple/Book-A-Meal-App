import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../server';

const { expect } = chai;

chai.use(chaiHttp);
describe('API to POST menu', () => {
  it('should return 409 for existing menu id', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        id: 1,
        menuTitle: 'African Delicacies',
        day: 'Monday',
        meals: [
          {
            id: 1,
            mealTitle: 'Strawberries',
            description: 'Fruity delicacy',
            price: 1000,
            imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
          },
          {
            id: 2,
            mealTitle: 'Tomato Spaghetti',
            description: 'Pasta Origine tasta',
            price: 1000,
            imageUrl: 'https://pixabay.com/en/spaghetti-pasta-noodles-italian-2931846/',
          },
        ],
      })
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body.status).to.equal('Fail');
        done();
      });
  });
  it('it should return 201 for a successful post', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .send({
        id: 2,
        menuTitle: 'Chinese Cuisines',
        day: 'Monday',
        meals: [
          {
            id: 1,
            mealTitle: 'Strawberries',
            description: 'Fruity delicacy',
            price: 1000,
            imageUrl: 'https://pixabay.com/en/raspberry-berry-ripe-2023404/',
          },
          {
            id: 2,
            mealTitle: 'Tomato Spaghetti',
            description: 'Pasta Origine tasta',
            price: 1000,
            imageUrl: 'https://pixabay.com/en/spaghetti-pasta-noodles-italian-2931846/',
          },
        ],
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Menu was successfully set');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('API to GET menu', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.an('object');
        done();
      });
  });
});
