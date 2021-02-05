const limitter = require('express-rate-limit')
const redis = require('../../server/redis')
const redisController = require('../helper/redis')
const moment = require('moment');
const RequestInformationQueue = require('../helper/queue');
const fetchServerData = require('../api')

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_WINDOW_REQUEST_COUNT = 15;
const WINDOW_LOG_INTERVAL_IN_SECONDS = 10;

const ipsFolder = 'ips'

// const rateLimitterUsingNPM = limitter({
//   windowMs: 5000, // 24 hrs in milliseconds
//   max: 5,
//   message: 'You have exceeded the 5 requests in 5 seconds limit',
//   headers: true,
// });

const sendInformationToQueue = async (req, next, app) => {
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
  const options = {
    delay: 1000, // 1 min in ms
    attempts: 2
  };

  RequestInformationQueue.add({ httpRequest }, options)

  RequestInformationQueue.on('global:completed', async (jobId, completed) => {
    fetchServerData(app)
    next()
  })
}

const createRedisRecord = async (ip, currentRequestTime) => {
  let newRecord = [{
    requestTimeStamp: currentRequestTime.unix(),
    requestCount: 1
  }];
  redisController.setKeyValue(ipsFolder, ip, JSON.stringify(newRecord))
}

const filterWindowEntries = (records, currentRequestTime) => {
  let windowTimeStamp = currentRequestTime.clone()
    .subtract(WINDOW_SIZE_IN_SECONDS, 'seconds').unix()

  return records.filter(entry => entry.requestTimeStamp > windowTimeStamp)
}

const countRequests = (records) => records.reduce((accumulator, entry) => accumulator + entry.requestCount, 0);

const incrementOrCreateRecord = async (records, ip, currentRequestTime) => {
  const lastRequestLog = records[records.length - 1]
  const logInterval = currentRequestTime.clone().subtract(WINDOW_LOG_INTERVAL_IN_SECONDS, 'seconds').unix()

  if (lastRequestLog.requestTimeStamp > logInterval) {
    let lastRequestLog = records[records.length - 1]
    lastRequestLog.requestCount++;
    records[records.length - 1] = lastRequestLog;
  }

  else {
    records.push({
      requestTimeStamp: currentRequestTime.unix(),
      requestCount: 1
    });
  }

  redisController.setKeyValue(ipsFolder, ip, JSON.stringify(records));
}

const newEntry = async (currentRequestTime, ip) => {
  let newRecords = []

  newRecords.push({
    requestTimeStamp: currentRequestTime.unix(),
    requestCount: 1
  });
  await redisController.setKeyValue(ipsFolder, ip, JSON.stringify(newRecords));
}

module.exports = (app) => {
  return async function (req, res, next) {
    try {
      const ip = req.ip

      const records = await redisController.getKeyValue(ipsFolder, ip)

      const currentRequestTime = moment()

      if (!records) {
        createRedisRecord(ip, currentRequestTime)
        sendInformationToQueue(req, next, app)
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
          else {
            incrementOrCreateRecord(records, ip, currentRequestTime)
          }
        }
        sendInformationToQueue(req, next, app)
      }
    }


    catch (err) {
      console.error(err)
    }
  }
}