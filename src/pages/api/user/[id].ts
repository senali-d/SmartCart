import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import dbConnection from '../../../util/database'
const catchAsyncError = require('../../../middleware/catchAsyncError')

const updateUser = catchAsyncError(async(req: NextApiRequest, res: NextApiResponse) => {
  const user = await User.findByIdAndUpdate(req.query.id, req.body)
  res.status(200).json({
    success: true
  })
})

export default dbConnection(updateUser)