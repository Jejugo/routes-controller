const fetch = require('node-fetch')
const {
  getHealth,
  getAnalytics,
  getNotFound,
  getAccount,
  getUser,
  getAuth
} = require('../_controllers')

const expressCallBack = require('../../server/endpoint-callback')

module.exports = async (httpRequest, req, res) => {
  let entity

  if(httpRequest.path.includes('/')){
    if(httpRequest.path.split('/').length === 1){
      entity = `/${httpRequest.path}`
    }
    else{
      requestParams = httpRequest.path.split('/').filter(param => param !== '')
      entity = `/${requestParams[0]}`
      requestParams.splice(0, 1)
    }
  }

  switch (entity) {
    case '/health':
      return expressCallBack(req, res, getHealth, requestParams)()
    case '/analytics':
      return expressCallBack(req, res, getAnalytics, requestParams)()
    case '/users':
      return expressCallBack(req, res, getAccount, requestParams)()
    default:
      return expressCallBack(req, res, getNotFound, requestParams)()
  }

} 