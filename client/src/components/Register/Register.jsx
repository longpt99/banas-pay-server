import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Register.propTypes = {};

function Register(props) {
  return (
    <div className="container flex items-center justify-center h-screen ml-auto mr-auto">
      <div>
        {props.children}
        <p className="italic text-sm mt-3 text-gray-600">
          Do you have an account ?{' '}
          <Link to="/login">
            <span className="text-blue-500 hover:text-blue-700 hover:underline">
              Go to login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
