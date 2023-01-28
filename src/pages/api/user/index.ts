import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import dbConnection from '../../../util/database'
const catchAsyncError = require('../../../middleware/catchAsyncError')

const user = catchAsyncError(async(req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "GET") {
    const user = await User.findOne({ email: req.query.email })
    if(user) {
      if(user.password === req.query.password) {
        res.status(201).json({
          success: true,
          user,
        })
      }else {
        res.status(404).json({
          success: false,
          message: "Password not mached",
        })
      }
    }else {
      res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
  }
})

export default dbConnection(user)