const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {type: String, required: false},
  email: {type: String, required: true},
  address: {type: String, required: false},
  password: {type: String, required: true},
  mobile: {type: String, required: false},
}, {timestamps: true})

mongoose.models = {}
export default mongoose.model('User', UserSchema)