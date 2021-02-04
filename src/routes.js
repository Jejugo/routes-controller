const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const meliConfig = require('./helper/meli')

const dotenv = require('dotenv')

dotenv.config()
meliConfig()

const cors = require('../server/cors')

const app = express()
const customRedisRateLimitter = require('./middleware/rateLimitter')(app)

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (cors.allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});


app.use(customRedisRateLimitter)

app.use(cookieParser())

module.exports = {
  createServer: () => app
}