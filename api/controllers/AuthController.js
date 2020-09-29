/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  login: async (req, res) => {
    try {
      const signToken = await localLogin(req, res);
      if (signToken.success === false) {
        throw signToken;
      }
      const accessToken = jwt.sign(
        signToken,
        sails.config.token.JWT_SECRET_KEY,
        {
          expiresIn: sails.config.token.JWT_EXPIRES_IN,
        }
      );
      const refreshToken = jwt.sign(
        signToken,
        sails.config.token.RJWT_SECRET_KEY,
        {
          expiresIn: sails.config.token.RJWT_EXPIRES_IN,
        }
      );

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          token: {
            accessToken,
            refreshToken,
          },
        },
      });
    } catch (error) {
      return error.status
        ? res.status(error.status).json(error)
        : res.json(error);
    }
  },
  register: async (req, res) => {
    const client = await sails.helpers.mongoConnect();
    try {
      debugger;
      await client.connect();
      const userId = await client
        .db()
        .collection('customer')
        .findOne(
          { phone: req.user.phone, status: 'init' },
          { projection: { _id: 1 } }
        );
      if (!userId) {
        throw {
          success: false,
          message: 'User not found',
          status: 404,
        };
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await Promise.all([
        client
          .db()
          .collection('customer')
          .updateOne(
            { _id: userId._id },
            {
              $set: {
                ...req.body.basicInfo,
                status: 'active',
              },
            }
          ),
        client.db().collection('auth').insertOne({
          phone: req.user.phone,
          password: hashedPassword,
          countWrongPassword: 0,
          userId: userId._id,
        }),
      ]);
      return res.status(200).json({
        success: true,
        message: 'New account created successfully',
      });
    } catch (error) {
      return res.status(error.status).json(error);
    } finally {
      await client.close();
    }
  },
  refreshToken: (req, res) => {
    const accessToken = jwt.sign(req.user, sails.config.token.JWT_SECRET_KEY, {
      expiresIn: sails.config.token.JWT_EXPIRES_IN,
    });
    // const refreshToken = jwt.sign(
    //   req.user,
    //   sails.config.token.RJWT_SECRET_KEY,
    //   {
    //     expiresIn: sails.config.token.RJWT_EXPIRES_IN,
    //   }
    // );

    return res.status(200).json({
      success: true,
      message: 'Refresh token successful',
      data: {
        token: {
          accessToken,
          refreshToken: req.user.token.refreshToken,
        },
      },
    });
  },
};

const localLogin = async (req) => {
  const client = await sails.helpers.mongoConnect();
  try {
    await client.connect();

    const { phone, password } = req.body;

    if (!phone || !password) {
      const field = phone ? 'password' : 'phone';
      throw {
        success: false,
        message: `Field ${field} is required`,
        field,
        status: 404,
      };
    }
    const auth = await client.db().collection('auth').findOne({ phone });
    if (!auth) {
      throw {
        success: false,
        message: 'The phone number not found',
        field: 'phone',
        status: 404,
      };
    }

    if (auth.countWrongPassword > 4) {
      throw {
        success: false,
        message:
          'Invalid account. Please go to the nearest bank to re-issue your account',
        filed: 'password',
        status: 404,
      };
    }

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) {
      throw {
        success: false,
        message: 'Invalid password',
        field: 'password',
        status: 404,
      };
    }
    return { userId: auth.userId, name: req.col };
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};
