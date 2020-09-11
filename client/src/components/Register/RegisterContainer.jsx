import React, { useState, useEffect } from 'react';
import Register from './Register';
import Account from './Account';
import Information from './Information';
import Confirmation from './Confirmation';

function RegisterContainer() {
  const errors = {};
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(true);

  const countDown = () => {};

  const handleSubmitForm = (data, e) => {
    e.preventDefault();
  };

  const handleChangeStep = (num, e) => {
    console.log(num);
    setStep(num);
  };
  const props = { errors, handleSubmitForm, handleChangeStep, status };

  return (
    // <button onClick={() => handleChangeStep(step + 1)}>{step}</button>
    <Register>
      {step === 1 ? (
        <Account {...props} />
      ) : step === 2 ? (
        <Information {...props} />
      ) : (
        <Confirmation />
      )}
    </Register>
  );
}

export default RegisterContainer;
