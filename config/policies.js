/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  AuthController: {
    login: ['basicToken'],
    register: ['otpToken'],
    refreshToken: ['refreshToken'],
  },
  OtpController: {},
  CustomerController: {
    fetchProfile: ['bearerToken', 'bearerCustomer'],
  },
  ClientController: {},

  'officer/AuthController': {
    login: ['basicToken'],
  },
  'officer/CustomerController': {
    // profile: ['bearerToken', 'bearerAdmin', 'userRole'],
  },
};
