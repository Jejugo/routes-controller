const { createServer } = require('../src/routes')
const config = require('../config')
const mongoose = require('mongoose')
const PORT = 3000

const app = createServer()

mongoose.connect(`mongodb://${config.host}:27017`, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connected to db')
    app.listen(PORT || process.env.PORT, () => {
      console.log(`Server is listening on port ${PORT}.`)
    })
  })
  .catch(err => console.error('There was an error connecting to the db: ', err))