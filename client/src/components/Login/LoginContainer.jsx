import React, { useEffect } from 'react';
import Login from './Login';
import { useDispatch } from 'react-redux';

function LoginContainer(props) {
  // const errors = useSelector((state) => state.errors);
  const errors = {};
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     const clearErrs = setTimeout(() => {
  //       dispatch(actResetError());
  //     }, 5000);
  //     return () => clearTimeout(clearErrs);
  //   }
  // }, [dispatch, errors]);
  const handleSubmitForm = (data, e) => {
    console.log(data);
    e.preventDefault();
  };
  return <Login errs={errors} handleSubmitForm={handleSubmitForm} />;
}

export default LoginContainer;
