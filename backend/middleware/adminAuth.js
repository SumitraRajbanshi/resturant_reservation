import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        success: false,
        message: 'Unauthorized user'
      });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: 'User is not authorized'
      });
    }

    next();

  } catch (error) {
    return res.json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

export default adminAuth;
