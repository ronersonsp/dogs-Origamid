import React from 'react';

const types = {
  email: {
    regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Preencha um email válido',
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
    message: 'A senha precisa conter letras e números.',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize somente números',
  }
};

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
