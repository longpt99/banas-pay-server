module.exports = async (req, res, next) => {
  const client = await await sails.helpers.mongoConnect();;
  try {
    await client.connect();
    const [, controller, action] = req.options.action.split('/');
    const perm = await client
      .db()
      .collection('permission')
      .findOne({ controller, action }, { projection: { _id: 1 } });
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
            _id: 1,
            name: 0,
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
};
