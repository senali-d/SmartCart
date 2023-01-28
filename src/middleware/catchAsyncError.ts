import type { NextApiRequest, NextApiResponse } from 'next'

module.exports = (catchAsycError: any) => (req: NextApiRequest, res: NextApiResponse, next: any) => {
  Promise.resolve(catchAsycError(req, res, next)).catch(next);
}