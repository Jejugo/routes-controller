const { createServer } = require('../src/routes')
const config = require('../config')
const mongoose = require('mongoose')
const PORT = 3000

const app = createServer()

mongoose.connect(`mongodb://mongoadmin:secret@${config.mongo.host}:27017`, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.info('connected to db')
    app.listen(PORT || process.env.PORT, () => {
      console.info(`Server is listening on port ${PORT}.`)
    })
  })
  .catch(err => console.error('There was an error connecting to the db: ', err))