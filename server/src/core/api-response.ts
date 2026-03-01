export const sendSuccess = (res: any, data: any, status = 200) => {
  res.status(status).json({
    status: 'OK',
    data,
    timestamp: new Date().toISOString()
  });
};

export const sendError = (res: any, message: string, status = 400) => {
  res.status(status).json({
    status: 'error',
    error: message,
    timestamp: new Date().toISOString()
  });
};