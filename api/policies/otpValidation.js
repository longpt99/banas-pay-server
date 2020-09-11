const { totp } = require('otplib');
const { ObjectId } = require('mongodb');

module.exports = async (req, res, next) => {
  const client = mongoConnect();
  try {
    await client.connect();
    const customerId = ObjectId(req.body.customerId);
    const otp = await client.db().collection('otp').findOne({ customerId });
    if (!otp) {
      throw new Error('OTP Code is not exists');
    }
    const isValid = totp.verify({
      token: req.body.otpToken,
      secret: otp.secret,
    });
    if (!isValid) {
      await client.db().collection('otp').deleteOne({ customerId });
      throw new Error('Invalid OTP code');
    }
    return next();
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  } finally {
    await client.close();
  }
};
