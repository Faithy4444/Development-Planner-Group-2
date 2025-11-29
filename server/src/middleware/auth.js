import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('x-auth-token');
  // Check if no token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  // Verify the token
  try {
    // Decode the token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add the user object (containing the ID) to the request object
    // so that our routes can use it.
    req.user = decoded.user;
    // Call the next function in the chain (either another middleware or the route handler)
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;