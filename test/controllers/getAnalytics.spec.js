const { createServer } = require('../../src/routes')

const sinon = require('sinon')
//chai configuration
const chai = require('chai')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')
let chaiHttp = require('chai-http');

const mongoController = require('../../src/helper/mongodb')
const Request = require('../../src/mongo/models/request')
chai.use(chaiHttp);
chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.should()

global.expect = chai.expect

describe("GET /analytics ", () => {
	let sandbox

	beforeEach(() => {
		sandbox = sinon.createSandbox()
	})

	after(() => {
		sandbox.restore()
	})

	//test a function for a specific case
	it("returns status 200", async () => {
    sandbox.stub(mongoController, 'retrieveFromMongo').resolves({
      body: 'teste'
    })
		const { statusCode, body } = await chai.request(createServer()).get('/analytics')
		expect(statusCode).to.equal(200)
	})
})