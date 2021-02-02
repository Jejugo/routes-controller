const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { rateLimiterUsingNPM, customRedisRateLimitter } = require('./middleware/rateLimiter')
const meliConfig = require('./helper/meli')

const dotenv = require('dotenv')
const {
  getHealth,
  getUser,
  getAuth
} = require('./_controllers')

dotenv.config()
meliConfig()

const cors = require('../server/cors')
const expressCallBack = require('../server/endpoint-callback')
const redirectCallBack = require('../server/endpoint-redirect')

const app = express()
app.use(bodyParser.json())

app.use(customRedisRateLimitter)

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (cors.allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});

app.use(cookieParser())

const setUpRoutes = () => {

  app.get('/health', expressCallBack(getHealth))
  app.get('/auth', expressCallBack(getAuth))
  app.get('/users/me', expressCallBack(getUser))
  return app
}

module.exports = {
  createServer: () => setUpRoutes()
}