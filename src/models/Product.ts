const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  image: {type: String, required: false},
  rating: {type: Number, required: false},
  price: {type: Number, required: false},
  category: {type: String, required: true},
  ingredients: {type: [String], required: false},
  nutritions: {type: [{
    name: String,
    amount: String
  }], required: false},
}, {timestamps: true})

mongoose.models = {}
export default mongoose.model('Product', ProductSchema)