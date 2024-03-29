
const { mongoRequestTrack } = require('../src/builders')
const { saveToMongo } = require('../src/helper/mongodb')

const saveToMongoAnalytics = (request, response) => {
  const requestObject = mongoRequestTrack(request, response)
  saveToMongo(requestObject)
}

module.exports = (controller) => {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
        Authorization: req.get('Authorization')
      }
    }
    controller(httpRequest)
      .then(httpResponse => {
        if(httpResponse.headers){
          res.set(httpResponse.headers)
        }
        
        res.type('json')
        saveToMongoAnalytics(httpRequest, httpResponse)
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
  }
}