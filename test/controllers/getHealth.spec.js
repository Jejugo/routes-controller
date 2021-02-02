const { createServer } = require('../../src/routes')

const sinon = require('sinon')
//chai configuration
const chai = require('chai')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.should()

global.expect = chai.expect

describe("GET /health ", () => {
	let sandbox

	beforeEach(() => {
		sandbox = sinon.createSandbox()
	})

	after(() => {
		sandbox.restore()
	})

	//test a function for a specific case
	it("returns status 200", async () => {
		const { statusCode, body } = await chai.request(createServer()).get('/health')
		expect(statusCode).to.equal(200)
	})
})