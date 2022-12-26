import { Schema, model } from 'mongoose'
const mongoosePaginate = require('mongoose-paginate')
const { Types } = Schema
const mockendpointSchema = new Schema({
  _id: Types.ObjectId,
  url: {
    type: String,
    required: [true, 'url is required'],
  },
  method: {
    type: String,
    required: [true, 'method is required'],
    enum: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
    default: 'GET',
  },
  params: {
    type: String,
  },
  jsonResponse: {
    type: Object,
  },
  shouldRaiseException: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
})
mockendpointSchema.index({ url: 1, method: 1, params: 1 }, { unique: true })
mockendpointSchema.plugin(mongoosePaginate)

const Mockendpoint = model('mockendpoint', mockendpointSchema)
export default Mockendpoint
