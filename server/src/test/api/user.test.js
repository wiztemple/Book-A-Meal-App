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

describe('User Api', () => {
  describe('User sign up', () => {
    const signupUrl = '/api/v1/auth/signup';
    it('should register a new user with complete credentials', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(firstUser)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Account created');
          expect(response.body.user.firstName).to.equal(firstUser.firstName);
          expect(response.body.user.lastName).to.equal(firstUser.lastName);
          expect(response.body.user.email).to.equal(firstUser.email);
          expect(response.body.user.role).to.equal(firstUser.caterer);
          expect(response.body).to.have.property('token');
          expect(response.body.token).to.be.a('string');
          expect(response.body.user).to.not.have.property(firstUser.password);
          done();
        });
    });
    it(
      'Should not register a user with an already existing email',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(firstUser)
          .end((error, response) => {
            expect(response).to.have.status(409);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Email already exist');
            done();
          });
      }
    );
    it(
      'Should not create a new user with a wrong email format',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Philnewman',
            lastName: 'Newman',
            email: 'newman.com',
            role: 'customer',
            password: 'last24hoursinandela',
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.email)
              .to.include('Email address invalid');
            done();
          });
      }
    );
    it(
      'Should not register a new user with an empty firstName field ',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: '',
            lastName: 'temple',
            email: 'klip7@gmail.com',
            password: 'homealone',
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.firstName)
              .to.include('firstname is required');
            done();
          });
      }
    );
    it(
      'Should not register a new user with an empty lastName field ',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Vilzak',
            lastName: '',
            email: 'caleb7@gmail.com',
            password: 'liverpoolfctv',
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.lastName)
              .to.include('lastName is required');
            done();
          });
      }
    );
    it(
      'Should not register a new user with an email field is empty',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Orlando',
            lastName: 'Williams',
            email: '',
            password: 'wisdomly',
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.email)
              .to.equal('Email is required');
            done();
          });
      }
    );
    it(
      'Should not register a new user with an empty password field',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'Emmanuel',
            lastName: 'Ogunbo',
            email: 'emmanuel7@gmail.com',
            password: '',
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.password)
              .to.include('password is empty');
            done();
          });
      }
    );
  });
});

describe('User sign in', () => {
  const loginUrl = '/api/v1/users/login';
  it('Should sign in a user with the correct details', (done) => {
    chai.request(app)
      .post(loginUrl)
      .send(secondUser)
      .end((error, response) => {
        userToken = response.body.token;
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.foundUser.firstName).to.equal(firstUser.firstName);
        expect(response.body.foundUser.lastName).to.equal(firstUser.lastName);
        expect(response.body.foundUser.role).to.equal(firstUser.role);
        expect(response.body.foundUser.email).to.equal(secondUser.email);
        expect(response.body).to.have.property('token');
        expect(response.body.foundUser).to.not.have.property(secondUser.password);
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.be.a('string');
        done();
      });
  });
  it('Should not log in user without password', (done) => {
    chai.request(app)
      .post(loginUrl)
      .send({
        email: 'wiztemple7@gmail.com',
        password: '',
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.error.password).to.equal('Password is required');
        done();
      });
  });

  it('Should not sign in user without email address', (done) => {
    chai.request(app)
      .post(loginUrl)
      .send({
        email: '',
        password: 'winnning',
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.error.email)
          .to.equal('Email is required');
        done();
      });
  });

  it('Should not sign in a user with an incorrect password', (done) => {
    chai.request(app)
      .post(loginUrl)
      .send({
        email: 'wiztemple7@gmail.com',
        password: 'lastdays0008',
      })
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.message)
          .to.equal('These credentials do not match our record');
        done();
      });
  });

  it('Should not sign in a user with an incorrect email address', (done) => {
    chai.request(app)
      .post(loginUrl)
      .send({
        email: 'tesugmail.com',
        password: '1234567890',
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message)
          .to.equal('Invalid email address');
        done();
      });
  });
});

