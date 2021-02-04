const makeGetAccount = () => {
  return async function (httpRequest) {
    try {
      console.log('cheguei')
      console.log(httpRequest)

      const account = retrieveAccount()
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

module.exports = makeGetAccount