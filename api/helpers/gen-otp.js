const { totp } = require('otplib');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  friendlyName: 'Gen otp',
  description: 'Generate OTP',
  inputs: {
    phone: {
      type: 'string',
      require: true,
    },
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const client = await sails.helpers.mongoConnect();
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
          { phone: inputs.phone, status: 'init' },
          {
            $set: {
              status: 'disabled',
            },
          }
        ),
        col.insertOne({
          secretKey: secret,
          status: 'init',
          phone: inputs.phone,
        }),
        await sails.helpers.sendSms(inputs.phone, otpCode),
      ]);
      return {
        success: true,
        status: 200,
        message: `Generate OTP successful. OTP code: ${otpCode}`,
      };
    } catch (error) {
      return error;
    } finally {
      await client.close();
    }
  },
};
