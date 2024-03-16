const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ msy: "Someting went wrong!" });
};

export default errorHandlerMiddleware;
