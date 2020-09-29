/**
 * OtpController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { totp } = require('otplib');
const jwt = require('jsonwebtoken');

module.exports = {
  generate: async (req, res) => {
    const client = await sails.helpers.mongoConnect();
    try {
      await client.connect();
      const { phone, deviceId } = req.body;

      const isCheck = await checkPhone(phone);
      if (isCheck.status === 'active') {
        throw {
          success: false,
          message: 'User has exists',
          status: 409,
        };
      }

      if (isCheck.status === 'init' && isCheck.deviceId === deviceId) {
        const token = await signToken(phone);
        return res.status(token.status).json(token);
      }

      if (isCheck.status === 'init' && isCheck.deviceId !== deviceId) {
        await Promise.all([
          client.db().collection('customer').deleteOne({ phone }),
        ]);
      }

      const otp = await sails.helpers.genOtp(phone);
      return res.status(otp.status).json(otp);
    } catch (error) {
      return res.status(error.status).json(error);
    } finally {
      await client.close();
    }
  },
  validate: async (req, res) => {
    const client = await sails.helpers.mongoConnect();
    try {
      debugger;
      await client.connect();
      const db = client.db();
      const otp = await db
        .collection('otp')
        .findOne({ phone: req.body.phone, status: 'init' });

      if (!otp) {
        throw {
          success: false,
          message: 'OTP Code not found',
          status: 404,
        };
      }
      const isValid = totp.verify({
        token: req.body.otpToken,
        secret: otp.secretKey,
      });

      if (!isValid) {
        throw {
          success: false,
          message: 'OTP code expired',
          status: 401,
        };
      }
      await Promise.all([
        db.collection('otp').updateOne(
          { phone: otp.phone, status: 'init' },
          {
            $set: {
              status: 'verify',
            },
          }
        ),
        db.collection('customer').insertOne({
          phone: req.body.phone,
          status: 'init',
          deviceId: req.body.deviceId,
        }),
      ]);
      const token = await signToken(otp.phone);
      return res.status(token.status).json(token);
    } catch (error) {
      return res.status(error.status).json(error);
    } finally {
      await client.close();
    }
  },
  regenerate: async (req, res) => {
    const client = await sails.helpers.mongoConnect();
    try {
      debugger;
      await client.connect();
      const user = await client.db().collection('otp').findOne({
        phone: req.body.phone,
        status: 'init',
      });

      if (!user) {
        throw {
          success: false,
          message: 'User not found',
          status: 404,
        };
      }
      const otp = await sails.helpers.genOtp(req.body.phone);
      return res.status(otp.status).json(otp);
    } catch (error) {
      return res.status(error.status).json(error);
    } finally {
      await client.close();
    }
  },
};

const checkPhone = async (phone) => {
  const client = await sails.helpers.mongoConnect();
  try {
    await client.connect();
    const user = await client.db().collection('customer').findOne({ phone });
    if (user && user.status) {
      return {
        status: user.status,
        deviceId: user.deviceId,
      };
    }
    return {
      status: 'none',
    };
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};

const signToken = (phone) => {
  const token = jwt.sign({ phone }, sails.config.token.OTP_JWT_SECRET_KEY, {
    expiresIn: sails.config.token.OTP_JWT_EXPIRES_IN,
  });
  return {
    success: true,
    message: 'Verified successful',
    data: { token },
    status: 200,
  };
};
