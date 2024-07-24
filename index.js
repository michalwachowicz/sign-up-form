const pwd = document.querySelector("#pwd");
const pwdConfirm = document.querySelector("#pwd-confirm");
const signUpForm = document.querySelector("form");

let passwordInvalid = true;
let match = false;

const pwdValidator = {
  validator: document.querySelector("#pwd-validator"),
  minLength: {
    element: document.querySelector("#pwd-length"),
    validator: (password) => password.length >= 8,
  },
  number: {
    element: document.querySelector("#pwd-num"),
    validator: (password) => /\d/.test(password),
  },
  upper: {
    element: document.querySelector("#pwd-upper"),
    validator: (password) => /[A-Z]/.test(password),
  },
  lower: {
    element: document.querySelector("#pwd-lower"),
    validator: (password) => /[a-z]/.test(password),
  },
  special: {
    element: document.querySelector("#pwd-special"),
    validator: (password) =>
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
  },
  match: document.querySelector("#pwd-match"),
};

const enableClass = (element, className, enable) => {
  const hasClass = element.classList.contains(className);

  if (enable && !hasClass) {
    element.classList.add(className);
  } else if (!enable && hasClass) {
    element.classList.remove(className);
  }
};

const validateCheck = (element, validator) => {
  enableClass(element, "valid", validator);
  return validator;
};

const showMatchError = (show) => {
  enableClass(pwdConfirm, "invalid", show);
  enableClass(pwdValidator.match, "hidden", !show);
};

const passwordMatch = () => {
  const password = pwd.value;
  const confirmPassword = pwdConfirm.value;

  match = password == confirmPassword;
  showMatchError(!match);
};

const showInvalidError = (show) => {
  enableClass(pwd, "invalid", show);
  enableClass(pwdValidator.validator, "hidden", !show);
};

const validate = (e) => {
  const password = e.target.value;
  passwordInvalid = false;

  for (const prop in pwdValidator) {
    if (prop === "validator" || prop === "match") continue;

    const validator = pwdValidator[prop];
    const valid = validateCheck(
      validator.element,
      validator.validator(password)
    );

    if (!passwordInvalid && !valid) passwordInvalid = !valid;
  }

  showInvalidError(passwordInvalid);
  passwordMatch();
};

const preventSubmit = (e) => {
  if (passwordInvalid) {
    showInvalidError(true);
    e.preventDefault();
  }

  if (!match) {
    showMatchError(true);
    e.preventDefault();
  }
};

pwd.addEventListener("input", validate);
pwdConfirm.addEventListener("input", passwordMatch);
signUpForm.addEventListener("submit", preventSubmit);
