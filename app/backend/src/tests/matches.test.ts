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

describe.only('"/matches" route integration tests', () => {
  let chaiHttpResponse: Response;

  describe('GET', () => {
    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Returns all matches', async () => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as IMatch[]);
      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
    });

    it('Returns matches that are in progress', async () => {
      sinon.stub(Match, 'findAll').resolves([matchesMock[1]] as IMatch[]);
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.eql([matchesMock[1]]);
    });

    it('Returns matches that are not in progress', async () => {
      sinon.stub(Match, 'findAll').resolves([matchesMock[0]] as IMatch[]);
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.eql([matchesMock[0]]);
    });
  });
});
