import { useState } from 'react';
import validator from 'validator';

type StringOrNull = string | null;

type ReturnType = [
  validate: (mail: string, password: string)=> boolean,
  error: StringOrNull,
];

export const useUserAuthValidation = (): ReturnType => {
  const [error, setError] = useState<StringOrNull>(null);

  const [passwordError, setPasswordError] = useState<StringOrNull>(null);

  const validate = (email: string, password: string)=> {

    let error = false;

    if (!validator.isEmail(email)) {
      error = true;
    }

    if (validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) {
      error = true;
    }

    if (error) {
      setError('Email or password is incorrect');
    }

    return error;
  }

  return [validate, error];
}
