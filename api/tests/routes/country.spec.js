/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
    id: 'ARG',
    name: 'Argentina',
    image: 'https://flagcdn.com/ar.svg',
    continent: 'Americas',
    capital: 'Buenos Aires',
    subregion: 'South America',
    area: '2780400',
    population: '45376763',
};

describe('Country routes', () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error('Unable to connect to the database:', err);
        })
    );
    beforeEach(() =>
        Country.sync({ force: true }).then(() => Country.create(country))
    );
    describe('GET /countries', () => {
        it('should get 200', () => agent.get('/countries').expect(200));
    });
});

describe('GET /countries?name=... should work with capital letters', () => {
    let name = 'Argentina';
    it('should get 200', () =>
        agent.get(`/countries?name=${name}`).expect(200));
});

describe('GET /countries?name=... should return error status 400', () => {
    let name = '234';
    it('should get 400', () =>
        agent.get(`/countries?name=${name}`).expect(400));
});

describe('GET /countries/:id Should work if found in the database ', () => {
    let id = 'ARG';
    it('should get 200', () => agent.get(`/countries/${id}`).expect(200));
});

describe('GET /countries/:id should return error status 400 if it can\'t find the id in the database', () => {
    let id = '2';
    it('should get 400', () => agent.get(`/countries/${id}`).expect(400));
});
