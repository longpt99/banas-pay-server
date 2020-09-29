/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: 'string',
    mail: {
      type: 'string',
      isEmail: true,
    },
    gender: 'string',
    birth: 'number',
    address: { type: 'string', defaultsTo: 'N/A' },
    identityCardUrl: { type: 'json', columnType: 'array' },
    identityNumber: 'string',
    status: {
      type: 'string',
      defaultsTo: 'init',
    },
    devideId: 'string',
  },
};
