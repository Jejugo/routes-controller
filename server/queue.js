const RequestInformationQueue = require('../src/helper/queue')
const redisController = require('../src/helper/redis')
const RequestModel = require('../src/mongo/models/request')

const bullFolder = 'bull'


RequestInformationQueue.process((job, done) => {
  
  console.log('job: ', job.data)
  done()

  // const { httpRequest } = job.data
  // const ip = httpRequest.ip.split('::ffff:')[1]

  // // const redisObject = {
  // //   ...httpRequest,
  // //   status: job.data.status,
  // //   timestamp: job.data.timestamp,
  // //   ip
  // // }

  // // redisController.setKeyValue(bullFolder, httpRequest.path, JSON.stringify(redisObject))
  // const requestObject = new RequestModel({
  //   ip,
  //   path: httpRequest.path,
  //   status: job.data.status
  // })

  // requestObject.save()
  // .then(result => {
  //   console.log('salvo', result)
  // })
  // .catch(err => {
  //   console.log('errrro')
  //   console.error(err)
  // })
})
