const limitter = require('express-rate-limit')
const redis = require('../../server/redis')
const redisController = require('../helper/redis')
const moment = require('moment');

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_WINDOW_REQUEST_COUNT = 5;
const WINDOW_LOG_INTERVAL_IN_SECONDS = 10;

const redisClient = redis.client

const rateLimiterUsingNPM = limitter({
  windowMs: 5000, // 24 hrs in milliseconds
  max: 5,
  message: 'You have exceeded the 5 requests in 5 seconds limit',
  headers: true,
});


const createRedisRecord = (ip, currentRequestTime) => {
  let newRecord = [{
    requestTimeStamp: currentRequestTime.unix(),
    requestCount: 1
  }];
  redisClient.set(ip, JSON.stringify(newRecord))
}

const filterWindowEntries = (records, currentRequestTime) => {
  let windowTimeStamp = currentRequestTime.clone()
    .subtract(WINDOW_SIZE_IN_SECONDS, 'seconds').unix()

  return records.filter(entry => entry.requestTimeStamp > windowTimeStamp)
}

const countRequests = (records) => records.reduce((accumulator, entry) => accumulator + entry.requestCount, 0);

const incrementOrCreateRecord = (records, ip, currentRequestTime) => {
  const lastRequestLog = records[records.length - 1]
  const logInterval = currentRequestTime.clone().subtract(WINDOW_LOG_INTERVAL_IN_SECONDS, 'seconds').unix()

  if(lastRequestLog.requestTimeStamp > logInterval){
    let lastRequestLog = records[records.length - 1]
    lastRequestLog.requestCount++;
    records[records.length - 1] = lastRequestLog;
  }

  else{
    records.push({
      requestTimeStamp: currentRequestTime.unix(),
      requestCount: 1
    });
  }

  redisClient.set(ip, JSON.stringify(records));
}

const newEntry = (currentRequestTime, ip) => {
  let newRecords = []

  newRecords.push({
    requestTimeStamp: currentRequestTime.unix(),
    requestCount: 1
  });
  redisClient.set(ip, JSON.stringify(newRecords));
}

const customRedisRateLimitter = async (req, res, next) => {
  try {
    const ip = req.ip

    const records = await redisController.getKeyValue(ip)

    const currentRequestTime = moment()

    if (!records) {
      createRedisRecord(ip, currentRequestTime)
    }

    else {
      const entries = filterWindowEntries(records, currentRequestTime)
      if (!entries.length) {
        newEntry(currentRequestTime, ip)
      }

      else {
        const totalCountRequests = countRequests(records)
        if (totalCountRequests >= MAX_WINDOW_REQUEST_COUNT) {
          res
            .status(429)
            .send(
              `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_SECONDS} secs limit!`
            );
        }
        else{
          incrementOrCreateRecord(records, ip, currentRequestTime)
        }
      }
    }
  }

  catch (err) {
    console.error(err)
  }
}

module.exports = {
  rateLimiterUsingNPM,
  customRedisRateLimitter
}