const { MongoClient } = require('mongodb');

module.exports = {
  friendlyName: 'Mongo connect',
  description: '',
  inputs: {},
  fn: async function () {
    return new MongoClient(sails.config.datastore.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
};
