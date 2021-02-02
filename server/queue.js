const RequestInformationQueue = require('../src/helper/queue')
const redisController = require('../src/helper/redis')

const RequestInformation = require('../server/jobs/RequestJob')
const dotenv = require('dotenv')

RequestInformationQueue.process((job, done) => {
  const { httpRequest } = job.data
  const redisObject = {
    ...httpRequest,
    status: job.data.status
  }

  redisController.setKeyValue(bullFolder, httpRequest.path, JSON.stringify(redisObject))
  done()
})