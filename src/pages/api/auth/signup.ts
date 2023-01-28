import { hash } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import dbConnection from '../../../util/database'
const catchAsyncError = require('../../../middleware/catchAsyncError')

const signUp = catchAsyncError(async(req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "POST") {
    const { email, password } = req.body
    if (!email || !email.includes('@') || !password) {
      res.status(422).json({ message: 'Invalid Data' });
      return;
    }
    const checkExisting =  await User.findOne({ email: email })
    if (checkExisting) {
      res.status(422).json({ message: 'User already exists' });
      return;
    }
    const status = await User.create({
      email,
      password: await hash(password, 12),
    })
    res.status(201).json({ message: 'Sign up success', ...status });
  }else {
    res.status(500).json({ message: 'Route not valid' });
	}
})

export default dbConnection(signUp)