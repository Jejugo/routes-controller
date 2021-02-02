const makeGetAuth = () => {
  return async function getAuth(httpRequest = {}){

    try{
      console.log('bateu aqui')
      const { code } = httpRequest.query
      console.log(`chegou o code: `, code)
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