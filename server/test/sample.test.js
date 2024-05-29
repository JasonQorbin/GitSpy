const { server, http } = require("../server");
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);


describe("Test routes", () => {
    it("Bad Route", (done) => {
        chai.request(server)
            .get('/badRoute')
            .end((error, response) => {
                expect(response.status).to.equal(400);
                done();
            });
    });

    it("Bad route nested inside a good route", (done) => {
        chai.request(server)
            .get('/users/username/repos/badRoute')
            .end((error, response) => {
                expect(response.status).to.equal(400);
                done();
            });
    });

    //Note for review: From this point on these are no longer unit tests because they rely on a response
    //from an external service. These are now essentially integration tests as they require the Github servers to be
    //running, and the server running the test to have internet access.
    //Ideally the Github service should be mocked up to make these actual unit tests.


    it("User search route", (done) => {
        chai.request(server)
            .get('/api/search/ABC?page=1')
            .end((error, response) => {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                const data = JSON.parse(response.text);
                expect(Array.isArray(data.users)).to.equal(true);
                expect(data.currentPage).to.equal('1');
                expect(data.next).to.equal('2');
                done();

            });
    });

    it("User detail route", (done) => {
        chai.request(server)
            .get('/api/users/katee')
            .end((error, response) => {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                done();

            });
    });

    it("User repos route", (done) => {
        chai.request(server)
            .get('/api/users/katee/repos')
            .end((error, response) => {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                done();

            });
    });

    it("User repo commits route", (done) => {
        chai.request(server)
            .get('/api/repo?user=katee&repo=galaxy-tab')
            .end((error, response) => {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                done();

            });
    });

    it("User repo commits route (Missing query params)", (done) => {
        chai.request(server)
            .get('/api/repo')
            .end((error, response) => {
                expect(error).to.be.null;
                expect(response.status).to.equal(400);
                done();
            });
    });

    after( done => {http.close(done)});
});