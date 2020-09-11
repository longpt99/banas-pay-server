import React from 'react';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

function Account(props) {
  const { errs } = props;
  const { register, handleSubmit, errors, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div className="w-screen max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(props.handleSubmitForm)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            ref={register}
          />
          {/* {(errors.username || errs.username) && (
              <p className="text-red-500 italic text-xs">
                {errs.username
                  ? errs.username.message
                  : errors.username.message}
              </p>
            )} */}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            ref={register}
          />
          {/* {(errors.password || errs.password) && (
              <p className="text-red-500 italic text-xs">
                {errs.password
                  ? errs.password.message
                  : errors.password.message}
              </p>
            )} */}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone"
            ref={register}
          />
          {/* {(errors.password || errs.password) && (
              <p className="text-red-500 italic text-xs">
                {errs.password
                  ? errs.password.message
                  : errors.password.message}
              </p>
            )} */}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Gender
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone"
            ref={register}
          />
          {/* {(errors.password || errs.password) && (
              <p className="text-red-500 italic text-xs">
                {errs.password
                  ? errs.password.message
                  : errors.password.message}
              </p>
            )} */}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            name="address"
            placeholder="Address"
            ref={register}
          />
          {/* {(errors.password || errs.password) && (
              <p className="text-red-500 italic text-xs">
                {errs.password
                  ? errs.password.message
                  : errors.password.message}
              </p>
            )} */}
        </div>

        <div className="flex items-center">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onClick={() => props.handleChangeStep(1)}
          >
            Back
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => props.handleChangeStep(2)}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Account;
