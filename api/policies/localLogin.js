const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error('Error');
    }
    const auth = await client.db().collection('auth').findOne({ username });
    if (!auth) {
      throw new Error('User not found');
    }

    if (auth.countWrongPassword > 4) {
      throw new Error(
        'Invalid account. Please go to the nearest bank to re-issue your account'
      );
    }

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    req.signToken = { userId: auth.userId, name: req.col };
    return next();
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  } finally {
    await client.close();
  }
};
