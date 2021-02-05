const mocks = require('../../mocks')

const makeRetrieveUser = ({ cust_id }) => {
  
  const getUserFromMeliAPI = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      mocks.getUser(cust_id)
      resolve(mocks.getUser(cust_id))
    }, 1000)
  })

  return async function retrieveUser(){

    return getUserFromMeliAPI()
  }
}

module.exports = makeRetrieveUser