const RequestInformationQueue = require('../src/helper/queue')
const moment = require('moment')

module.exports = (controller) => {
  const now = moment()
  
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

        const options = {
          delay: 2000, // 1 min in ms
          attempts: 2
        };
        
        RequestInformationQueue.add({ status: 'success', httpRequest, timestamp: now.unix(), body: httpResponse.body }, options)
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch(err => {
        res.status(500).send({ error: 'An unknown error has ocurred.', message: err.message })
        //send request to queue
        RequestInformationQueue.add('RequestInformation', { status: 'error', httpRequest,  timestamp: now.unix() })
      })
  }
}