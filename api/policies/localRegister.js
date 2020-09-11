module.exports = async (req, res, next) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const auth = await client
      .db()
      .collection('auth')
      .findOne(
        { username: req.body.username },
        { projection: { _id: 0, username: 1 } }
      );
    if (auth) {
      throw new Error(`Username '${auth.username}' has exists`);
    }
    return next();
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  } finally {
    await client.close();
  }
};
