/**
 * OfficerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  updateUserRole: async (req, res) => {},
  createNewAdmin: async (req, res) => {
    const client = connectMongo();
    try {
      await client.connect();
      await client.db().collection(req.col).insertOne({
        username,
        email,
        phone,
        gender,
        roles,
        image,
      });
      return res.status(200).json({ msg: 'Create successful' });
    } catch (error) {
      sails.error(error.message);
      return res.status(404).json({ msg: error.message });
    } finally {
      await client.close();
    }
  },
};
