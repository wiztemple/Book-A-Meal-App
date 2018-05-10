import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxODE1MzYzLCJleHAiOjE1MjIyNDczNjN9.U0WCcpMiLPJpSFQBid35GU42ExV10FljUM0e_rpbvNk';

const Meal = {
  title: 'Puklane',
  description: 'Good soup',
  price: 100,
  imageUrl: 'https://www.err.com/hwh',
};

const User = {
  firstName: 'Sullivan',
  lastName: 'Wisdom',
  email: 'wiz@gmail.com',
  role: 'caterer',
  password: 'andela',
};


//  Add a business
describe('POST Meal/', () => {
  it('should be able to post a meal', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('x-access-token', token)
      .send(Meal)
      .end((error, response) => {
        expect(response)
          .to.have.status(201);
        expect(response.body)
          .to.be.a('object');
        done();
      });
  });

  it('should return 403 if meal does not have a title', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('x-access-token', token)
      .send({
        description: 'sweet food',
        price: 400,
        imageUrl: 'https://www.goalmentor',
      })
      .end((error, response) => {
        expect(response)
          .to.have.status(403);
        expect(response.body)
          .to.be.a('object');
        done();
      });
  });
  it('should return 403 if title is empty', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('x-access-token', token)
      .send({
        title: '',
        description: 'Delicious meal.',
        price: 400,
        imageUrl: 'https://www.hertayy',
      })
      .end((err, res) => {
        expect(res)
          .to.have.status(403);
        expect(res.body)
          .to.be.a('object');
        done();
      });
  });
});

