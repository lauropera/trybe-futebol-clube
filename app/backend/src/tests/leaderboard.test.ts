import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('"/leaderboard" route integration tests', () => {
  let chaiHttpResponse: Response;

  describe('"/leaderboard" GET', () => {
    it('Returns the leaderboard', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });
  });

  describe('"/leaderboard/home" integration tests', () => {
    it('Returns the home teams leaderboard', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });
  });

  describe('"/leaderboard/away" integration tests', () => {
    it('Returns the away teams leaderboard', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });
  });
});
