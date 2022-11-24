import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/Match';

import { Response } from 'superagent';
import { IMatch } from '../interfaces';
import { matchesMock } from './mocks/matchesMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('"/matches" route integration tests', () => {
  let chaiHttpResponse: Response;

  describe('GET', () => {
    it('Returns all matches', async () => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as IMatch[]);
      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
    });
  });
});
