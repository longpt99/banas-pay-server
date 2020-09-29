/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fetchAll: async (req, res) => {
    const client = await sails.helpers.mongoConnect();;
    try {
      await client.connect();
    } catch (error) {
      return;
    } finally {
      await client.close();
    }
  },
  fetch: (req, res) => {},
  create: (req, res) => {},
  update: (req, res) => {},
  delete: (req, res) => {},
};
