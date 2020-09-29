module.exports = {
  friendlyName: 'Send sms',

  description: '',

  inputs: {
    phone: {
      type: 'string',
      require: true,
    },
    otpCode: {
      type: 'string',
      require: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    console.log(inputs.otpCode);
    return inputs.otpCode;
  },
};
