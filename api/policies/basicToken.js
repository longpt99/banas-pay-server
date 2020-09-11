module.exports = async (req, res, next) => {
  const client = mongoConnect();
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('You must send an Authorization header');
    }
    const [authType, token] = authorization.trim().split(' ');
    if (authType !== 'Basic') {
      throw new Error('Expected a Basic token');
    }
    await client.connect();
    const recorded = await client.db().collection('client').findOne({ token });
    if (!recorded) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    req.col = recorded.name;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  } finally {
    await client.close();
  }
};
