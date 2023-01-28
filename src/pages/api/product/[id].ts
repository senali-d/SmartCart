import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../models/Product'
import dbConnection from '../../../util/database'
const catchAsyncError = require('../../../middleware/catchAsyncError')

const getProduct = catchAsyncError(async(req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "GET") {
    const product = await Product.findById(req.query.id)
    res.status(200).json({
      product,
      success: true
    })
  }
  if(req.method === "PUT") {
    const product = await Product.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
      success: true
    })
  }
})

export default dbConnection(getProduct)