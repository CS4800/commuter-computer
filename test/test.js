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
        it('Given a request for gas prices, return a json object containing gas prices', function(done) {
            chai.request(server)
                .get('/api/mongo/gases')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    const la_data = res.body.find(function(element) {
                        return element.county === 'Los Angeles-Long Beach'
                    });
                    const la_gas_month_avg = la_data.prices.find(function(avgData) {
                        return avgData.avgType === 'Month Ago Avg.'
                    })
                    expect(la_gas_month_avg.regular).to.greaterThan(3.0);
                    expect(la_gas_month_avg.regular).to.lessThan(6.0);
                    done();
            })
        })
        it('Given a request for rents, return rents', function(done) {
            this.timeout(15000)
            chai.request(server)
                .get('/api/mongo/rents')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    const pomona_data = res.body.find(
                        element => element.city == 'Pomona'
                    )
                    expect(pomona_data.prices['1Bedroom']).to.be.lt(1400);
                    expect(pomona_data.prices['1Bedroom']).to.be.gt(1300);
                    done();
                })
        })
    })
    describe('POST to form data to commuter calculator api', function() {
        it('Given form data, return the calucated costs', function(done) {
            this.timeout(7000)
            chai.request(server)
                .post('/api/com-calc')
                .send({
                    homeAddr1: '300 E Graves Ave Monterey Park',
                    homeAddr2: '',
                    homeCost1: '1500',
                    homeCost2: '',
                    remoteAddr: 'Jet Propulsion Laboratory',
                    startTime: '09:00',
                    endTime: '17:00',
                    income: '25',
                    daysPerWeek: '5',
                    mpg: '25'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    const costs = res.body.results[0].costs
                    // verify names are correct
                    expect(costs[0].name).to.equal('Opportunity Cost')
                    expect(costs[1].name).to.equal('Gas Cost')
                    expect(costs[2].name).to.equal('Mortgage Cost')
                    // verify values are correct
                    expect(Number(costs[0].value)).to.be.greaterThan(630);
                    expect(Number(costs[0].value)).to.be.lessThan(690);
                    expect(Number(costs[1].value)).to.greaterThan(70);
                    expect(Number(costs[1].value)).to.lessThan(90);
                    expect(Number(costs[2].value)).to.equal(1500);
                    done();
                })
        })
    })

})
