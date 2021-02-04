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
  },
  header: {
    required: false,
    type: Object
  },
  body: {
    required: false,
    type: Object
  },
  query: {
    required: false,
    type: Object
  },
  params: {
    required: false,
    type: Object
  }
}, { timestamps: true })

const Request = mongoose.model('request', requestSchema)

module.exports = Request