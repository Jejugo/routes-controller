const Queue = require('bull')
const config = require('../../config');

const RequestJob = require('../../server/jobs/RequestJob')

const RequestInformationQueue = new Queue(RequestJob.key, { redis: config.redis.connection })

module.exports = RequestInformationQueue