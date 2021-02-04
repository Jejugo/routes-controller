const makeGetAnalytics = ({ errorMessages, mongoController, RequestModel }) => {
  return async function (httpRequest) {
    try {

      const {
        path,
        status
      } = httpRequest.query
      const analyticsResult = await mongoController.retrieveFromMongo(RequestModel, path, status)
      return {
        statusCode: 200,
        body: analyticsResult
      }
    }
    catch (err) {
      const { status, body } = errorMessages[err.message] || { status: 400, body: err.message }
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: status,
        body: {
          error: body,
        }
      }
    }
  }
}

module.exports = makeGetAnalytics