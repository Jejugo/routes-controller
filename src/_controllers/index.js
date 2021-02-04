
const makeGetHealth = require('./health')
const makeGetAuth = require('./auth')
const makeGetUser = require('./users/makeGetUser')
const makeGetAnalytics = require('./analytics')
const makeGetNotFound = require('./notFound')

const errorMessages = require('../error-messages.json')
const mongoController = require('../helper/mongodb')
const RequestModel = require('../mongo/models/request')
const { retrieveUser } = require('../_use-cases')

const getHealth = makeGetHealth()
const getAuth = makeGetAuth()
const getAnalytics = makeGetAnalytics({ errorMessages, mongoController, RequestModel})
const getUser = makeGetUser({ errorMessages, retrieveUser })
const getNotFound = makeGetNotFound()

module.exports = {
  getHealth,
  getAuth,
  getUser,
  getAnalytics,
  getNotFound
}
