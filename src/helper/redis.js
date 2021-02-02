const redis = require('../../server/redis')
const config = require('../../config')

const redisClient = redis.client

/**
 * @module utils/redisClient
 * @method [utils/redisClient] setKeyValue
 * @description Saves token on Redis, and sets it's expiration
 * @param {Number} key
 * @param {Number} value - token
 * @param {Number} token - expiration
 */
const setKeyValue = async (folder, key, value) => {
  console.info(`Setting values for ${key}: ${value}`, { scope: 'Redis' })
  await redisClient.set(`${folder}:${key}`, value)
  //await redisClient.expire(`${folder}:${key}`, expiration)
}

/**
 * @module utils/redisClient
 * @method [utils/redisClient] getKeyValue
 * @description Returns a value from a redis key
 * @returns {Promise<Object>}
 */
const getKeyValue = (ipsFolder, key) => new Promise((resolve, reject) => {
  redisClient.get(`${ipsFolder}:${key}`, (err, value) => {
    if (err) {
      console.debug('Redis get an error on get method', key, { scope: 'Redis' })
      return reject(err)
    }
    console.info(`Fetching values for ${key}`, { scope: 'Redis' })
    resolve(JSON.parse(value) || '')
  })
})

/**
 * @module utils/redisClient
 * @method [utils/redisClient] removeCache
 * @description Remove cache from redis
 * @returns {Promise<Object>}
 */
const removeCache = (folder, key) => new Promise((resolve, reject) => {
  redisClient.del(`${folder}:${key}`, (err) => {
    if (err) return reject(err)
    resolve()
  })
})

/**
 * @module utils/redisClient
 * @method [utils/redisClient] scanKeys
 * @description Returns keys that matches with a query
 * @param {String} folder Redis's folder
 * @param {String} query text
 * @param {Integer} [cursor=0] iterator
 * @param {Array<String>} [totalKeys=[]] list of keys
 * @returns {Promise<Object>} Keys
 */
const scanKeys = async ({ folder, query, cursor = 0, totalKeys = [], exactMatch = false }) => {
  const { redis: { scanCount } } = config
  const match = exactMatch
    ? `${query.replace(/ /g, '*')}`
    : `${query.replace(/ /g, '')}*`

  const [cursorPosition, keys] = await redisClient.scanAsync(
    cursor,
    'MATCH', `${folder}:${match}`,
    'COUNT', scanCount
  )
  const newCPosition = parseInt(cursorPosition)
  console.log(`Fetching keys for query: ${query} in ${folder}`, { scope: 'Redis' })
  if (newCPosition === 0) return [...keys, ...totalKeys]
  return scanKeys({ folder, query, exactMatch, cursor: newCPosition, totalKeys: [...keys, ...totalKeys] })
}

module.exports = {
  getKeyValue,
  setKeyValue,
  removeCache,
  scanKeys
}