import { useState } from 'react';
import validator from 'validator';

type StringOrNull = string | null;

type ReturnType = [
  validate: (fullName: string, email: string, password: string, passwordConfirm: string)=> boolean,
  nameError: StringOrNull,
  emailError: StringOrNull,
  passwordError: StringOrNull
];

export const useUserCreateValidation = (): ReturnType => {

  const [nameError, setNameError] = useState<StringOrNull>(null);

  const [emailError, setEmailError] = useState<StringOrNull>(null);

  const [passwordError, setPasswordError] = useState<StringOrNull>(null);

  const validate = (fullName: string, email: string, password: string, passwordConfirm: string)=> {

    let error = false;

    if (validator.isEmpty(fullName)) {
      error = true;
      setNameError('Full name is required');
    } else {
      setNameError(null);
    }

    if (!validator.isEmail(email)) {
      error = true;
      setEmailError('Email is invalid');
    } else {
      setEmailError(null);
    }

    if (validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) {
      error = true;
      setPasswordError('Password must contain miinimum of 5 characters');
    } else if (password !== passwordConfirm) {
      error = true;
      setPasswordError('Password does not match password confirmation');
    } else {
      setPasswordError(null)
    }

    return error;
  }

  return [validate, nameError, emailError, passwordError];
}
