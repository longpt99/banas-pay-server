/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  'post /api/auth/login': 'auth.login',
  'post /api/auth/register': 'auth.register',
  'post /api/auth/refresh-token': 'auth.refreshToken',

  'post /api/otp/generate': 'otp.generate',
  'post /api/otp/validate': 'otp.validate',
  'post /api/otp/regenerate': 'otp.regenerate',

  'get /api/customer/profile': 'customer.fetchProfile',

  'post /api/client/create': 'client.create',

  'post /api/admin/auth/login': 'officer.auth.login',

  'get /api/test': 'test.test',
  // 'post /api/auth/register': 'auth.register',
  // 'post /api/auth/refresh-token': 'auth.refreshToken',

  // 'post /api/otp/generate': 'otp.generate',
  // 'post /api/otp/validate': 'otp.validate',
  // 'post /api/otp/renew': 'otp.renew',

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
