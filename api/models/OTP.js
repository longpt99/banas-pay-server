/**
 * Pocket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    userId: 'string',
    client: 'string',
    secret: 'string',
    verify: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
