const filters = require('../filters')

/**
 * @module helper/mongodb
 * @method [helper/saveToMongo] saveToMongo
 * @description Save model to mongodb
 * @returns {Object}
 */
const saveToMongo = (Model) => Model.save().then(result => {
  console.info('Request Object saved for Analytics.')
  console.log(result)
}).catch(err => {
  console.error('Could not save Request Object.')
  console.error(err)
})

/**
 * @module helper/mongodb
 * @method [helper/saveToMongo] retrieveAllFromMongo
 * @description Retrieve all documents from collection
 * @returns {Array}
 */
const retrieveFromMongo = (Model, path=null, status=null) => {
  let query = !path && !status ? {} : {
    path: `/${path}`,
    status
  }
 
  query = filters.global.removeNullFromObject(query)
  console.log('searching for: ', query)
  return Model.find(query)
}

module.exports = {
  saveToMongo,
  retrieveFromMongo
}