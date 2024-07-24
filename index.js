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

const displayValidator = (show) => {
  const validator = pwdValidator.validator;
  const hiddenClass = "hidden";
  const hidden = validator.classList.contains(hiddenClass);

  if (show && hidden) {
    validator.classList.remove(hiddenClass);
  } else if (!show && !hidden) {
    validator.classList.add(hiddenClass);
  }
};

const setValid = (element, valid) => {
  const validClass = "valid";
  const isValid = element.classList.contains(validClass);

  if (valid && !isValid) {
    element.classList.add(validClass);
  } else if (!valid && isValid) {
    element.classList.remove(validClass);
  }
};

const validateCheck = (element, validator) => {
  setValid(element, validator);
  return validator;
};

const validate = (e) => {
  const password = e.target.value;
  let passwordValid = true;

  for (const prop in pwdValidator) {
    if (prop === "validator" || prop === "match") continue;

    const validator = pwdValidator[prop];
    const valid = validateCheck(
      validator.element,
      validator.validator(password)
    );

    if (passwordValid && !valid) passwordValid = valid;
  }

  displayValidator(!passwordValid);
};

pwd.addEventListener("input", validate);
