const makeGetAuth = () => {
  return async function getAuth(httpRequest = {}){

    try{
      const { code } = httpRequest.query
      return {
        statusCode: 200,
        body: {
          code
        }
      }
    }
    catch(err){

    }
  }
}

module.exports = makeGetAuth