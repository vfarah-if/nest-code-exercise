import { Schema, model } from 'mongoose'
const mongoosePaginate = require('mongoose-paginate')
const { Types } = Schema
const SAPUserSchema = new Schema({
  _id: Types.ObjectId,
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
  },
  hash: {
    type: String,
    required: [true, 'hash is required'],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  details: {
    type: Object,
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
SAPUserSchema.plugin(mongoosePaginate)

const SapUser = model('sapusers', SAPUserSchema)
export default SapUser
