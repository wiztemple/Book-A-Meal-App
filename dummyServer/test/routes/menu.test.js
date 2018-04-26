import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../server';

const { expect } = chai;

chai.use(chaiHttp);
describe('API to POST menu', () => {
  it('Return 409 for existing menu id', (done) => {
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
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal('Fail');
        done();
      });
  });
  it('Return 201 for a successful post', (done) => {
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
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Menu was successfully set');
        done();
      });
  });
});

describe('API to GET menu', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
