import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
// Login.propTypes = {};

function Login(props) {
  const { errs } = props;
  const { register, handleSubmit, errors, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     const clearErrs = setTimeout(() => {
  //       clearErrors(['username', 'password']);
  //     }, 3000);
  //     return () => {
  //       clearTimeout(clearErrs);
  //     };
  //   }
  // }, [clearErrors, errors]);
  console.log(errors);
  return (
    <div className="container flex items-center justify-center h-screen ml-auto mr-auto">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(props.handleSubmitForm)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              ref={register}
            />
            {(errors.username || errs.username) && (
              <p className="text-red-500 italic text-xs">
                {errs.username
                  ? errs.username.message
                  : errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="******************"
              ref={register}
            />
            {(errors.password || errs.password) && (
              <p className="text-red-500 italic text-xs">
                {errs.password
                  ? errs.password.message
                  : errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <p className="italic text-sm mt-3 text-gray-600">
            Do not have an account ?{' '}
            <Link to="/register">
              <span className="text-blue-500 hover:text-blue-700  hover:underline">
                Go to register
              </span>
            </Link>
          </p>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
