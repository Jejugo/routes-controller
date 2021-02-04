const makeGetNotFound = () => {
  return async function getNotFound(httpRequest = {}){
      return {
        statusCode: 400,
        body: {
          error: 'Route not foud.'
        }
      }
  }
}

module.exports = makeGetNotFound