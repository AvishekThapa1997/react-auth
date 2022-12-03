import CONSTANTS from "../constants/constants";

export const isValidEmail = (email: string) =>
  CONSTANTS.REG_EXP.EMAIL.test(email.trim());

export const isValidPassword = (password: string) => {
  return password.length >= 6;
};

export const isValidPhoneNumber = (phoneNumber: string) =>
  CONSTANTS.REG_EXP.PHONE_NUMBER.test(phoneNumber);

export const isNotEmpty = (data: string) => data.trim() !== "";

export const isPasswordMatch = (password: string, confirmPassword: string) =>
  password === confirmPassword;
