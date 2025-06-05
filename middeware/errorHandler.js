const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
  
    // Set default status code and message
    let status = err.status || 500;
    let message = err.message || "Internal Server Error";
  
    // Handle validation errors from Mongoose
    if (err.name === "ValidationError") {
      status = 400;
      message = err.message;
    }
  
    res.status(status).json({ message });
  };
  
  export default errorHandler;