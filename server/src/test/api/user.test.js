import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../app';

chai.use(chaiHttp);

let userToken;
const firstUser = {
  firstName: 'Sullivan',
  lastName: 'Ukaegbu',
  email: 'wiztemple7@gmail.com',
  role: 'caterer',
  password: 'lastdays',
};

const secondUser = {
  email: 'wiztemple7@gmail',
  password: 'lastdays',
};

const thirdUser = {
  firstName: 'Temple',
  lastName: 'Ivan',
};

describe('User Api', () => {
  describe('User sign up', () => {
    const signupUrl = '/api/v1/auth/signup';
    it('should register a new user with complete credentials', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(firstUser)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('Account created');
          done();
        });
    });
  });
});

