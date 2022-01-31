const superTest = require("supertest");
const expect = require("chai").expect;
const env = require('../env');
const request = superTest(env.url);
const gists = require('../utils/gistfunctions');
const authHeaders = require('../data/headers').authHeaders
const unAuthHeaders = require('../data/headers').unAuthHeaders
const requestBody = require('../data/requestdata').requestBody;
const updateBody = require('../data/requestdata').updateBody;
let gistId;

describe("Un-authenticated Read Gists", function () {

    it("Get /gists", async function () {
        const response = await request.get(`/gists?per_page=1`)
            .set('User-Agent', 'GistsAPI')
            .set('Content-Type', 'application/vnd.github.v3+json');
        expect(response.status).to.eql(200);
    });

})

describe("Un-authenticated Read Specific Gist", function () {

    beforeEach(async function () {
        const response = await gists.createGist(requestBody, authHeaders);
        gistId = response.body.id;
    })


    it("Get /gists/${gistId}", async function () {
        const response = await request.get(`/gists/${gistId}`)
            .set('User-Agent', 'GistsAPI')
            .set('Content-Type', 'application/vnd.github.v3+json');
        expect(response.status).to.eql(200);
    });

    afterEach(async function () {
        await gists.deleteGist(gistId, authHeaders)
    });

})

describe("Authenticated - Create Gist", function () {

    it("Post /gists", async function () {
        const response = await gists.createGist(requestBody, authHeaders);
        gistId = response.body.id;
        expect(response.status).to.eql(201);

    });

    afterEach(async function () {
        await gists.deleteGist(gistId, authHeaders)
    });
})

describe("Authenticated - Read Gist", function () {

    beforeEach(async function () {
        const response = await gists.createGist(requestBody, authHeaders);
        gistId = response.body.id;
    })

    it("Get /gist/${gistId}", async function () {
        const response = await gists.getGistsAuthenticated(gistId, authHeaders);
        expect(response.status).to.eql(200);
        expect(response.body.id).to.eql(gistId);
        expect(response.body.description).to.eql(requestBody.description);

    });

    afterEach(async function () {
        await gists.deleteGist(gistId, authHeaders)
    });

})

describe("Authenticated - Update Gist", function () {

    beforeEach(async function () {
        const response = await gists.createGist(requestBody, authHeaders);
        gistId = response.body.id;
    })

    it("Get /gist/${gistId}", async function () {
        const response = await gists.updateGist(gistId, updateBody, authHeaders);
        expect(response.status).to.eql(200);
        expect(response.body.id).to.eql(gistId)
        expect(response.body.description).to.eql(updateBody.description);
    });

    afterEach(async function () {
        await gists.deleteGist(gistId, authHeaders)
    });

})

describe("Authenticated - Delete Gist", function () {

    beforeEach(async function () {
        const response = await gists.createGist(requestBody, authHeaders);
        gistId = response.body.id;
    })


    it("Delete /gist/${gistId}", async function () {
        const response = await gists.deleteGist(gistId, authHeaders)
        expect(response.status).to.eql(204);
    });


})

describe("Negative Scenarios", function () {

    it("Post /gists - Unauthorised", async function () {
        const response = await gists.createGist(requestBody, unAuthHeaders);
        gistId = response.body.id;
        expect(response.status).to.eql(401);

    });

    it("Post /gists - Unprocessable Entity", async function () {
        const response = await gists.createGist({}, authHeaders);
        gistId = response.body.id;
        expect(response.status).to.eql(422);

    });

    it("Get /gist/${gistId - Not Found}", async function () {
        const response = await gists.updateGist("abcd1", updateBody, authHeaders);
        expect(response.status).to.eql(404);
    });
})
