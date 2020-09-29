const { totp } = require('otplib');
const { v4: uuidv4 } = require('uuid');

const genOtp = async (phone) => {
  const client = await sails.helpers.mongoConnect();;
  try {
    await client.connect();
    const col = client.db().collection('otp');
    const secret = uuidv4();
    totp.options = {
      step: 30,
      digits: 6,
    };
    const otpCode = totp.generate(secret);
    await Promise.all([
      col.updateMany(
        { phone, status: 'init' },
        {
          $set: {
            status: 'disabled',
          },
        }
      ),
      col.insertOne({
        secretKey: secret,
        status: 'init',
        phone,
      }),
      sendSms(phone, otpCode),
    ]);
    return {
      success: true,
      status: 200,
      message: 'Generate OTP successful',
    };
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};

module.exports = genOtp;
