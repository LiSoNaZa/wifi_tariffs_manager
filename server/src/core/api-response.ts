
/**
 * Basic success response
 *
 * @param {*} res 
 * @param {*} data 
 * @param {number} [status=200] 
 */
export const sendSuccess = (res: any, data: any, status = 200) => {
  res.status(status).json({
    status: 'OK',
    data,
    timestamp: new Date().toISOString()
  })
}


/**
 * Basic error response
 *
 * @param {*} res 
 * @param {string} message 
 * @param {number} [status=400] 
 */
export const sendError = (res: any, message: string, status = 400) => {
  res.status(status).json({
    status: 'error',
    error: message,
    timestamp: new Date().toISOString()
  })
}