const CONSTANTS = {
  REG_EXP: {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    PHONE_NUMBER: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  },
  DEBOUNCE_DELAY: 800,
  ERRORS: {
    INVALID_EMAIL: "Email is invalid.",
    INVALID_PASSWORD: "Password is invalid.",
    INVALID_USERNAME: "Username is invalid",
    INVALID_PHONE_NUMBER: "Phone number is invalid",
    PASSWORD_DID_NOT_MATCH: "Password did not match",
  },
  ROUTES: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
};

export default CONSTANTS;
