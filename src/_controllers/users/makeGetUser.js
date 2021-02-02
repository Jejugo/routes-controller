const makeGetUser = ({ errorMessages, retrieveUser }) => {
	return async function getUser(httpRequest) {
		try {
			const user = await retrieveUser()
			
			return {
				statusCode: 200,
				body: user
			}
		}
		catch(err) {
			console.log('errou!!', err)
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

module.exports = makeGetUser