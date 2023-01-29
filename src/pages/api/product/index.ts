import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../models/Product'
import dbConnection from '../../../util/database'
const catchAsyncError = require('../../../middleware/catchAsyncError')

const product = catchAsyncError(async(req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "GET") {
    let params
    let limitCount
    if(req.query.name === undefined && req.query.ingredients === undefined && req.query.nutritions === undefined) {
      params = req.query
    }else if(req.query.name !== undefined && req.query.ingredients === undefined && req.query.nutritions === undefined) {
      params = { "name": {$regex: '.*' + req.query.name + '.*', $options: 'i'} }
    }else if(req.query.name === undefined && req.query.ingredients !== undefined && req.query.nutritions === undefined) {
      params = {"ingredients": (req.query.ingredients).toString().split(","), "_id": { '$ne': req.query.id } }
      limitCount = 4
    }else if(req.query.name === undefined && req.query.ingredients === undefined && req.query.nutritions !== undefined) {
      params = {"nutritions": { $elemMatch: { "name": (req.query.nutritions).toString().split(",") } }, "_id": { '$ne': req.query.id }}
      limitCount = 4
    }
    const products = await Product.find(params).limit(limitCount)
    if(products) {
      res.status(200).json({
        success: true,
        products,
      })
    }else {
      res.status(404).json({
        success: false,
        message: "product not found",
      })
    }
  }
  if(req.method === "POST") {
    const user = await Product.create(req.body)
    res.status(201).json({
      success: true,
      user,
    })
  }
})

export default dbConnection(product)