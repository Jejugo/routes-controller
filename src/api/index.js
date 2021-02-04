const fetch = require('node-fetch')
const {
  getHealth,
  getAnalytics,
  getUser,
  getAuth
} = require('../_controllers')

const expressCallBack = require('../../server/endpoint-callback')

module.exports = async (app) => {
  app.get('/health', expressCallBack(getHealth))
  app.get('/analytics', expressCallBack(getAnalytics))
  app.get('/users/:cust_id', expressCallBack(getUser))
  app.get('/users/:cust_id/accepted_payment_methods', expressCallBack(getUser))
  
} 