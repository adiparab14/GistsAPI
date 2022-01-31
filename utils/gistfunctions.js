const superTest = require("supertest");
const env = require('../env');
const request = superTest(env.url);


function createGist(requestBody, authHeaders) {

    return request.post(`/gists`)
        .set(authHeaders)
        .send(requestBody);
}

function getGistsAuthenticated(gistId, authHeaders) {

    return request.get(`/gists/${gistId}`)
        .set(authHeaders);

}

function updateGist(gistId, updateBody, authHeaders) {
    return request.patch(`/gists/${gistId}`)
        .set(authHeaders)
        .send(updateBody);
}

function deleteGist(gistId, authHeaders) {
    return request.delete(`/gists/${gistId}`)
        .set(authHeaders);
}
module.exports = { createGist, getGistsAuthenticated, updateGist, deleteGist };