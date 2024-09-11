//Imports the jsonwebtoken library to handle JWT operations like verification.
const jwt = require('jsonwebtoken');

//Defines the verifyToken middleware function which takes req (request), res (response), and next (next middleware function) as arguments.
const verifyToken = (req, res, next) => {
  //Retrieves the Authorization header from the incoming request. This header typically contains the JWT.
  const authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);
  //Checks if the Authorization header is present in the request. If it is not present, the function returns a 401 Unauthorized response.
  if (authHeader) {
    //Extracts the token part from the Authorization header (assuming the header is in the format Bearer <token>).
    const token = authHeader.split(' ')[1];

    console.log("Token:", token);
    //Uses the jwt.verify method to verify the token against the secret key (process.env.JWT_SECRET).
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      //If the token is invalid or verification fails, it returns a 403 Forbidden response with an appropriate message.
      if (err) {
        console.error("Token verification failed:", err); 
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }

      //If the token is valid, it attaches the decoded user information (user) to the request object (req.user).
      //Calls next() to pass control to the next middleware or route handler.
      req.user = user;
      next();
    });
  } 
  
  //If the Authorization header is missing, it returns a 401 Unauthorized response.
  else {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

//Exports the verifyToken middleware so it can be used in other parts of the application.
module.exports = verifyToken;
