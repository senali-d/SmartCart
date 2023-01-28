import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import User from '../../../models/User'
import dbConnection from '../../../util/database'
const catchAsyncError = require('../../../middleware/catchAsyncError')

const updateUser = catchAsyncError(async(req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }
  const user = await User.findByIdAndUpdate(req.query.id, req.body)

  if(!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  res.status(200).json({
    success: true,
    message: "Profile update sucessfully"
  })
})

export default dbConnection(updateUser)