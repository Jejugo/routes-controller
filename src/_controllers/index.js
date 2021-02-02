
const makeGetHealth = require('./health')
const makeGetAuth = require('./auth')
const makeGetUser = require('./users/makeGetUser')

const errorMessages = require('../error-messages.json')

const { retrieveUser } = require('../_use-cases')

const getHealth = makeGetHealth()
const getAuth = makeGetAuth()
const getUser = makeGetUser({ errorMessages, retrieveUser })

module.exports = {
  getHealth,
  getAuth,
  getUser
}
