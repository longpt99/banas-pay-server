/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { totp } = require('otplib');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  login: (req, res) => {
    try {
      const accessToken = jwt.sign(
        req.signToken,
        sails.config.token.JWT_SECRET_KEY,
        {
          expiresIn: sails.config.token.JWT_EXPIRES_IN,
        }
      );
      const refreshToken = jwt.sign(
        req.signToken,
        sails.config.token.RJWT_SECRET_KEY,
        {
          expiresIn: sails.config.token.RJWT_EXPIRES_IN,
        }
      );

      return res.status(200).json({
        msg: 'Login successful',
        token: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      return res.status(404).json({
        msg: error.message,
      });
    }
  },
  register: async (req, res) => {
    const client = mongoConnect();
    try {
      await client.connect();
      const {
        name,
        email,
        phone,
        gender,
        address,
        birth,
        username,
        password,
        identifyCard,
        identifyNumber,
      } = req.body;
      const customerId = new ObjectId();
      const hashedPassword = await bcrypt.hash(password, 10);
      await Promise.all([
        client.db().collection('customer').insertOne({
          _id: customerId,
          name,
          email,
          phone,
          gender,
          address,
          birth,
          identifyCard,
          identifyNumber,
        }),
        client.db().collection('auth').insertOne({
          username,
          password: hashedPassword,
          countWrongPassword: 0,
          customerId,
        }),
      ]);
      return res.status(200).json({ msg: 'Create new account succeed' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    } finally {
      await client.close();
    }
  },
  refreshToken: (req, res) => {
    const accessToken = jwt.sign(req.user, sails.config.token.JWT_SECRET_KEY, {
      expiresIn: sails.config.token.JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(
      req.user,
      sails.config.token.RJWT_SECRET_KEY,
      {
        expiresIn: sails.config.token.RJWT_EXPIRES_IN,
      }
    );

    return res.status(200).json({
      msg: 'Refresh token successful',
      token: {
        accessToken,
        refreshToken,
      },
    });
  },
  totpGenerate: async (req, res) => {
    const client = mongoConnect();
    try {
      await client.connect();
      const secret = uuidv4();
      totp.options = {
        step: 300,
        digits: 6,
      };
      const token = totp.generate(secret);
      const id = new ObjectId();
      await client.db().collection('otp').insertOne({
        customerId: id,
        secret,
      });
      await sendMail(req.body.mail, token);
      return res.status(200).json({
        customerId: id,
        // remaining: 30 - Math.floor((new Date().getTime() / 1000.0) % 30),
      });
    } catch (error) {
      return res.status(200).json({ msg: error.message });
    } finally {
      await client.close();
    }
  },
};
