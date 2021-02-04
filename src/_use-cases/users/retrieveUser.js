const mocks = require('../../mocks')

const makeRetrieveUser = ({ cust_id }) => {
  return async function retrieveUser(){
    return mocks.getUser(cust_id)
  }
}

module.exports = makeRetrieveUser