import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';
import User from '../database/models/User';
import { invalidLogins, loginMock, userMock } from './mocks/userMock';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('"/login" route integration tests', () => {
  let chaiHttpResponse: Response;

  describe('POST', () => {
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    });

    describe('With sucess', () => {
      it('Login successfully', async () => {
        sinon.stub(User, 'findOne').resolves(userMock as User);
        sinon.stub(jsonwebtoken, 'sign').resolves('generatedToken');
        sinon.stub(bcryptjs, 'compare').resolves(true);

        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send(loginMock);

        expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
        expect(chaiHttpResponse.body).to.deep.equal({
          token: 'generatedToken',
        });

        (jsonwebtoken.sign as sinon.SinonStub).restore();
      });
    });

    describe('With failure', () => {
      beforeEach(async () => {
        sinon.stub(User, 'findOne').resolves(undefined);
        sinon.stub(bcryptjs, 'compare').resolves(false);
      });

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
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({ ...loginMock, password: 'coxinha' });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({
          message: 'Incorrect email or password',
        });
      });
    });
  });
});

describe('"/login/validate" route integration tests', () => {
  let chaiHttpResponse: Response;

  describe('GET', () => {
    beforeEach(() => {
      sinon.stub(jsonwebtoken, 'verify').resolves({ id: 1 });
    });

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Returns the logged user role', async () => {
      sinon.stub(User, 'findOne').resolves(userMock as User);

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'something');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ role: userMock.role });
    });

    it('Fails if the user does not exists', async () => {
      sinon.stub(User, 'findOne').resolves(undefined);

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'something');

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'User not found',
      });
    });
  });
});
