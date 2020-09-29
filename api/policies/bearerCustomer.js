const { ObjectId } = require('mongodb');

module.exports = async (req, res, next) => {
  const client = await sails.helpers.mongoConnect();
  try {
    await client.connect();
    if (req.user.name !== 'customer') {
      throw new Error('Error');
    }
    const user = await client
      .db()
      .collection(req.user.name)
      .findOne({ _id: ObjectId(req.user.userId) });
    if (!user) {
      throw new Error('User not found');
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  } finally {
    await client.close();
  }
};
