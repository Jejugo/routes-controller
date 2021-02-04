const makeGetUser = ({ errorMessages, retrieveUser }) => {
	return async function getUser(httpRequest) {
		try {
			const {
				cust_id
			} = httpRequest.params

			const user = await retrieveUser(cust_id)
			
			return {
				statusCode: 200,
				body: user
			}
		}
		catch(err) {
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