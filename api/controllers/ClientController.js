/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  create: async (req, res) => {
    const client = mongoConnect();
    try {
      await client.connect();
      const { name } = req.body;
      await client.db().collection('client').insertOne({
        name,
        token: uuidv4(),
      });
      return res.json('Created successfull');
    } catch (error) {
      sails.log(error);
      return res.status(404).json(error);
    } finally {
      await client.close();
    }
  },
};
