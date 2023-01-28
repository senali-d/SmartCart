class ErrorHandler extends Error {
  statusCode: number
  status: undefined
  path: undefined
  constructor(message: string , statusCode: number) {
    super(message)
    this.statusCode = statusCode
    
    Error.captureStackTrace(this, this.constructor)
    this.status = undefined
    this.path = undefined
  }
}

export { ErrorHandler }