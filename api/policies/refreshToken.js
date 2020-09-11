const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('You must send an Authorization header');
    }
    const [authType, token] = authorization.trim().split(' ');
    if (authType !== 'Bearer') {
      throw new Error('Expected a Bearer token');
    }
    const user = jwt.verify(token, sails.config.token.RJWT_SECRET_KEY);
    delete user.iat;
    delete user.exp;
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
};
