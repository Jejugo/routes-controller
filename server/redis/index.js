const bluebird = require('bluebird')


let client

const createClient = () => {
  const { redis: { connection: configs}, node_env: nodeEnv } = require('../../config')
  const redis = require('redis')

  if (nodeEnv === 'test') return createTestClient()

  bluebird.promisifyAll(redis.RedisClient.prototype)
  bluebird.promisifyAll(redis.Multi.prototype)

  client = redis.createClient(configs)


  return client
}

const createTestClient = () => {
  const redisMock = require('redis-mock')
  bluebird.promisifyAll(redisMock.RedisClient.prototype)
  bluebird.promisifyAll(redisMock.Multi.prototype)

  logger.info('Starting mocked redis client', { scope: 'Redis' })
  client = redisMock.createClient()

  return client
}

module.exports = {
  get client () {
    return client || createClient()
  }
}