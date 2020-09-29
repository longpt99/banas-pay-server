module.exports = async (req, res, next) => {
  const client = await sails.helpers.mongoConnect();
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw {
        success: false,
        message: 'You must send an Authorization header',
        status: 401,
      };
    }
    const [authType, token] = authorization.trim().split(' ');
    if (authType !== 'Basic') {
      throw {
        success: false,
        message: 'Expected a Basic token',
        status: 401,
      };
    }
    await client.connect();
    const recorded = await client.db().collection('client').findOne({ token });
    if (!recorded) {
      throw {
        success: false,
        message: 'Client not found',
        status: 404,
      };
    }
    req.col = recorded.name;
    return next();
  } catch (error) {
    return res.status(error.status).json(error);
  } finally {
    await client.close();
  }
};
