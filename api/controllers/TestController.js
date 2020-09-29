/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  test: async (req, res) => {
    const client = await sails.helpers.mongoConnect();
    await client.connect();
    await client.db().collection('customer').find({}).toArray(console.log);
    await client.close();
    return res.json('Done');
  },
};
