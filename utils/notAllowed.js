



 export const notAllowed =(req, res)=>{
  return res.status(404).json({
    status: 'Error',
    message: 'method not allowed'
  })
}
 