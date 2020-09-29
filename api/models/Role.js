/**
 * UserRole.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: 'string',
    perms: {
      type: 'json',
      columnType: 'array',
      defaultsTo: [
        {
          permID: 'string',
          method: 'create',
          status: 'active',
        },
        {
          permID: 'string',
          method: 'read',
          status: 'active',
        },
        {
          permID: 'string',
          method: 'update',
          status: 'active',
        },
        {
          permID: 'string',
          method: 'delete',
          status: 'active',
        },
      ],
    },
    userId: 'string',
  },
};
