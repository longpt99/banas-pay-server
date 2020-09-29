/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fetchProfile: async (req, res) => {
    return res.status(200).json({
      message: 'Fetch User profile successfull',
      data: { info: req.user },
    });
  },
};
