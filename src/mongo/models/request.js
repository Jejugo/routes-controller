const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema({
  ip: {
    required: true,
    type: String
  },
  path: {
    required: true,
    type: String
  },
  status: {
    required: true,
    type: String
  }
}, { timestamps: true })

const Request = mongoose.model('Request', requestSchema)

module.exports = Request