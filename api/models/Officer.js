/**
 * Officer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    email: {
      type: 'string',
      isEmail: true,
    },
    phone: 'string',
    gender: 'string',
    roles: { type: 'json', columnType: 'array' },
    imageProfileUrl: 'string',
  },
};
