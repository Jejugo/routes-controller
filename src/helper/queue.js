const Queue = require('bee-queue')
const config = require('../../config');

const RequestInformationQueue = new Queue('RequestInformation', {
  stallInterval: 1000,
  redis: config.redis.connection
})

module.exports = RequestInformationQueue