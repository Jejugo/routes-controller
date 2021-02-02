const makeRetrieveUser = require('./users/retrieveUser')

const { meli } = require('../../config/index.json')
const fetch = require('node-fetch')

const retrieveUser = makeRetrieveUser({ fetch, meli })

module.exports = {
  retrieveUser
}