const makeGetHealth = () => {
  return async function getHealth(httpRequest = {}){
    try{
      return {
        statusCode: 200,
        body: {
          success: true
        }
      }
    }
    catch(err){
      return {
        statusCode: 500,
        body: {
          error: err.message
        }
      }
    }
  }
}

module.exports = makeGetHealth