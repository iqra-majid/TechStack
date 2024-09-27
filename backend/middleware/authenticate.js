import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    console.log(token);
    
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log("you are not loggedin");
          
          return res.sendStatus(403);
        }
        req.user = user; // Save user info to request
        next();
      });
    } else {
      res.sendStatus(401);
      console.log("no");
    }
  };

  export default authenticateJWT