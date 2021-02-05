const RequestInformationQueue = require('../src/helper/queue')
const redisController = require('../src/helper/redis')

const bullFolder = 'bull'

const saveDataToRedis = async (job, done) => {
  try{
    const { httpRequest } = job.data
    const ip = httpRequest.ip.split('::ffff:')[1] 
  
    const redisObject = {
      ...httpRequest,
      status: job.data.status,
      timestamp: job.data.timestamp,
      ip
    }
  
    await redisController.setKeyValue(bullFolder, httpRequest.path, JSON.stringify(redisObject))
    done()
  }
  catch(err){
    const error = new Error('Não foi possível salvar no redis.')
    done(error)
  }
}


RequestInformationQueue.process((job, done) => {
  saveDataToRedis(job, done)
})
