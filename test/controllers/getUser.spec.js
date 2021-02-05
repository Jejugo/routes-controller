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

const useCases = require('../../src/_use-cases')

global.expect = chai.expect

describe("GET /user ", () => {
	let sandbox

	beforeEach(() => {
		sandbox = sinon.createSandbox()
	})

	after(() => {
		sandbox.restore()
	})

	//test a function for a specific case
	// it.only("returns status 200", async () => {
  //   sandbox.stub(useCases, 'retrieveUser').resolves({
  //     name: 'teste'
  //   })

	// 	const { statusCode, body } = await chai.request(createServer()).get('/user/teste')
	// 	expect(statusCode).to.equal(200)
	// })
})