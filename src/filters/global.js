const removeNullFromObject = (object) => {
  Object.keys(object).forEach(key => {
    if(object[key] === null){
      delete object[key]
    }
  })

  return object
}

module.exports = {
  removeNullFromObject
}