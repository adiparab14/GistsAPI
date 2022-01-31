# Automated API Testing

Automated API Tests for Github Gists API were implemented as part of this project. The documentation for the API is available [here](https://docs.github.com/en/rest/reference/gists). This test framework was developed with SuperTest, Mocha, Chai and Javascript.


## Frameworks
Following frameworks were used to implement the test tests
- [SuperTest](https://github.com/visionmedia/supertest) provides a high level absctraction for the HTTP requests
- [Mocha](https://mochajs.org/) is a javascript testing framework
- [Chai](https://www.chaijs.com/) is used as the assertion library 
- [Mochawesome](https://github.com/adamgruber/mochawesome) is a report generator for the Mocha testing framework

## Github Actions
The tests are also executed as part of Continuous Integration using Github Actions.

The configuration file for the same is available here `.github/workflows/node.js.yml`

## Test Scenarios

#### Following test scenarios were covered
- Unauthenticated 
    - Read Gists
    - Read Specific Gist (Public)
- Authenticated
    - Create Gist 
    - Read Gist
    - Update Gist
    - Delete Gist   

#### Following Negative scenarios were also covered
- Unauthorized request `401`
- Unprocessable entity `422`
- Not Found `404`

## Steps to execute

- #### Pre-requisite
    - `node.js` should be installed on the system.

- #### Setup
    - Some of the test require an authenticated user to trigger the requests. Authetication token can be generated from Github account as shown [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). As these tests are only for gists, it is enough to limit the access of the token to gist.
    - Run `npm install` to install node modules.

- #### Execute tests on Local
    -  To execute all the tests without a test report

        `TOKEN=${YOUR_TOKEN} npm run test` 
    -  To execute all the tests using the mochawesome reporter. HTML and JSON reports will be available in the `mochawesome-report` folder   

        `TOKEN=${YOUR_TOKEN} npm run test:awesome` 
    - Tests can also be run individually as

        `TOKEN=${YOUR_TOKEN} npx mocha tests/test.js -g '${TEST_NAME}'`

- #### Execute tests on Github actions
    - Fork the repository
    - For the forked respository, create an secret as per steps [here](https://docs.github.com/en/actions/security-guides/encrypted-secrets). Add personal token in the variable `TOKEN`
    - Now trigger the Gists API Test workflow from Github Actions.
