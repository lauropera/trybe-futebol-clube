import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';
import { teamsMock } from './mocks/teamsMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('"/teams" route integration tests', () => {
  let chaiHttpResponse: Response;

  describe('GET', () => {
    it('Returns all teams', async () => {
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamsMock);
    });
  });
});

describe('"/teams/:id" route integration tests', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    (Team.findByPk as sinon.SinonStub).restore();
  });

  describe('GET', () => {
    it('Returns a team by his Id', async () => {
      sinon.stub(Team, 'findByPk').resolves(teamsMock[0] as Team);

      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamsMock[0]);
    });

    it('Fails if the team does not exists', async () => {
      sinon.stub(Team, 'findByPk').resolves(undefined);

      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'There is no team with such id!',
      });
    });
  });
});
