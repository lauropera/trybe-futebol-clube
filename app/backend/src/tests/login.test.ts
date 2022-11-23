import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';
import User from '../database/models/User';
import { invalidLogins, loginMock, userMock } from './mocks/userMock';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('"/login" route integration tests', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  describe('POST', () => {
    describe('With sucess', () => {
      it('Login successfully', async () => {
        sinon.stub(bcryptjs, 'compare').resolves(true);
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(loginMock);

        expect(chaiHttpResponse.status).to.be.equal(200);
        (bcryptjs.compare as sinon.SinonStub).restore();
      });
    });

    describe('It fails', () => {
      it('Fails if the email is not passed', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(invalidLogins[0]);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'All fields must be filled',
        });
      });

      it('Fails if the password is not passed', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(invalidLogins[1]);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'All fields must be filled',
        });
      });

      it('Fails if the email is invalid', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(invalidLogins[2]);

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'Incorrect email or password',
        });
      });

      it('Fails if the password is invalid', async () => {
        sinon.stub(bcryptjs, 'compare').resolves(false);
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({ ...loginMock, password: 'coxinha' });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'Incorrect email or password',
        });
        (bcryptjs.compare as sinon.SinonStub).restore();
      });
    });
  });
});

describe('"/login/validate" route integration tests', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(jsonwebtoken, 'verify').resolves({ id: 1 });
    sinon.stub(User, 'findOne').resolves(userMock as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  describe('GET', () => {
    it('Returns the logged user role', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .auth('token', { type: 'bearer' });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ role: userMock.role });
    });

    it('Fails if the user does not exists', async () => {
      (User.findOne as sinon.SinonStub).restore();
      sinon.stub(User, 'findOne').resolves(undefined);
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .auth('token', { type: 'bearer' });

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'User not found' });
    });
  });
});
