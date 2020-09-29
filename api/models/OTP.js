/**
 * Pocket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    secretKey: 'string',
    status: {
      type: 'string',
      defaultsTo: 'init',
    },
    phone: 'string',
  },
};
