const pwd = document.querySelector("#pwd");
const pwdConfirm = document.querySelector("#pwd-confirm");

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

const displayValidator = (show) =>
  enableClass(pwdValidator.validator, "hidden", !show);

const validateCheck = (element, validator) => {
  enableClass(element, "valid", validator);
  return validator;
};

const validate = (e) => {
  const password = e.target.value;
  let passwordInvalid = false;

  for (const prop in pwdValidator) {
    if (prop === "validator" || prop === "match") continue;

    const validator = pwdValidator[prop];
    const valid = validateCheck(
      validator.element,
      validator.validator(password)
    );

    if (!passwordInvalid && !valid) passwordInvalid = !valid;
  }

  displayValidator(passwordInvalid);
  enableClass(pwd, "invalid", passwordInvalid);
};

const passwordMatch = (e) => {
  const password = pwd.value;
  const confirmPassword = e.target.value;

  const match = password == confirmPassword;

  enableClass(e.target, "invalid", !match);
  enableClass(pwdValidator.match, "hidden", match);
};

pwd.addEventListener("input", validate);
pwdConfirm.addEventListener("input", passwordMatch);
