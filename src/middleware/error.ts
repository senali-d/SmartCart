import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorHandler } from '../util/errorhander'

module.exports = (err: ErrorHandler, req: NextApiRequest, res: NextApiResponse, next: any) => {
  err.statusCode = err.status || 500
  err.message = err.message || "Internal Server Error"

  /** Mongodb error */
  if(err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`
    err = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}