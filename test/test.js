var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
chai.use(chaiHttp);

var expect = chai.expect;

const request = chai.request(server)
//let should = chai.should();


describe('ApiRoutes', function() {
    describe('GET users', function() {
        it('Given a user in the api users route, it should return information on that user', done => {
            chai.request(server)
                .get('/api/users/mac')
                .end((err, res) => {
                    expect(res.body['name']).to.equal('Michael Ackerman');
                    expect(res.body['description']).to.equal('hi, im mac');
                })
            done();
        });
    })
})