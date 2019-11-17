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
                    done();
                })
        });
    })
    describe('GET mongo routes', function() {
        it('Given call gas prices, return a json object containing gas prices', function(done) {
            chai.request(server)
                .get('/api/mongo/gases')
                .end((err, res) => {
                    expect(res).to.have.status('200');
                    const la_data = res.body.find(function(element) {
                        return element.county === 'Los Angeles-Long Beach'
                    });
                    const la_gas_month_avg = la_data.prices.find(function(avgData) {
                        return avgData.avgType === 'Month Ago Avg.'
                    })
                    expect(la_gas_month_avg.regular).to.equal(4.216)
                    done();
            })
        })
    })
})