const RequestInformationQueue = require('../src/helper/queue')
const redisController = require('../src/helper/redis')

const bullFolder = 'bull'

const saveDataToRedis = (job) => {
  const { httpRequest } = job.data
  const ip = httpRequest.ip.split('::ffff:')[1] 

  const redisObject = {
    ...httpRequest,
    status: job.data.status,
    timestamp: job.data.timestamp,
    ip
  }

  redisController.setKeyValue(bullFolder, httpRequest.path, JSON.stringify(redisObject))
}


RequestInformationQueue.process((job, done) => {
  saveDataToRedis(job)
  done()
})
