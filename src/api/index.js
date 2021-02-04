const fetch = require('node-fetch')
const {
  getHealth,
  getAnalytics,
  getNotFound,
  getUser,
  getAuth
} = require('../_controllers')

const expressCallBack = require('../../server/endpoint-callback')

module.exports = async (httpRequest, req, res) => {
  switch (httpRequest.path) {
    case '/health':
      return expressCallBack(req, res, getHealth)()
    case '/analytics':
      return expressCallBack(req, res, getAnalytics)()
    default:
      return expressCallBack(req, res, getNotFound)()
  }

} 