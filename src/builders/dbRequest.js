const RequestModel = require('../mongo/models/request')

const mongoRequestTrack = (request, response) => new RequestModel({
  ip: request.ip,
  path: request.path,
  status: response.statusCode,
  body: request.body,
  query: request.query,
  params: request.params
})

module.exports = {
  mongoRequestTrack
}