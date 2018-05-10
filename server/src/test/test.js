import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxODE1MzYzLCJleHAiOjE1MjIyNDczNjN9.U0WCcpMiLPJpSFQBid35GU42ExV10FljUM0e_rpbvNk';

const Meal = {
  title: 'Vegetable soup',
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
const userSignup = '/api/v1/auth/signup';
const userLogin = '/api/v1/auth/login';
// Test Signing up a user
describe('User signup', () => {
  it('It Should create user with right signup credentials', (done) => {
    chai.request(app)
      .post(`${userSignup}`)
      .send(User)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Account was created');
        expect(response.body.User.firstName).to.equal(User.firstName);
        expect(response.body.User.lastName).to.equal(User.lastName);
        expect(response.body.User.role).to.equal(User.role);
        expect(response.body.User.email).to.equal(User.email);
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.be.a('string');
        expect(response.body).to.not.have.property(User.password);
        done();
      });
  });
  it('should not register a new user with an already existing email', (done) => {
    chai.request(app)
      .post(userSignup)
      .send(User)
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('User with that email Id exists');
        done();
      });
  });
  it('should not register user with a wrong email format', (done) => {
    chai.request(app)
      .post(userSignup)
      .send({
        firstName: 'Sullivan',
        lastName: 'Wisdom',
        email: 'wiz.com',
        role: 'caterer',
        password: 'lastdays',
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.error.email)
          .to.include('Email address is empty or invalid');
        done();
      });
  });
});

