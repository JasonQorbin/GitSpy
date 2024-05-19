const { server, http } = require("../server");
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe("Sample test", () => {
    const requestObject = chai.request(server);

    it("Test1", (done) => {
        requestObject
            .get('/')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.text).to.equal("Hi, from the server!");
            })
        done();
    });

    after( done => {http.close(done)});
})