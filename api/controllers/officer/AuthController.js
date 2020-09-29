/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: async (req, res) => {
    const client = await await sails.helpers.mongoConnect();;
    try {
      debugger;
      await client.connect();
      const [, controller, action] = req.options.action.split('/');
      const perm = await client
        .db()
        .collection('permission')
        .findOne({ action, controller }, { projection: { _id: 1 } });
      const role = await client
        .db()
        .collection('role')
        .findOne(
          {
            permissionIDs: {
              $in: [perm._id],
            },
          },
          {
            projection: {
              _id: 0,
              name: 1,
            },
          }
        );
      console.log(role);
      return res.json({ message: 'Hello' });
    } catch (error) {
      return res.json(error);
    } finally {
      await client.close();
    }
  },
  register: () => {},
};
