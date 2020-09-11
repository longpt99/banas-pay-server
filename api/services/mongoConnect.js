const { MongoClient } = require('mongodb');

const connectDb = () => {
  return new MongoClient(
    sails.config.datastores[sails.config.models.datastore].url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = connectDb;
