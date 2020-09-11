/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: 'string',
    phone: 'string',
    mail: {
      type: 'string',
      isEmail: true,
    },
    gender: 'string',
    birth: 'number',
    address: { type: 'string', defaultsTo: '' },
    identityCardUrl: { type: 'json', columnType: 'array' },
    identityNumber: 'string',
  },
};
