export function createControl (config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
};

function birhtdayCheck(str) {
  const isBirhtday = /^[0-9]{2}[.]{1}[0-9]{2}[.]{1}[0-9]{4}$/.test(str);
  return(isBirhtday);
}

function emailCheck(str) {
  const isEmail = /^[A-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(str);
  return(isEmail);
}

function telephoneCheck(str) {
  const isPhone = /^[+]{1}[0-9]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{4}$/.test(str);
  return(isPhone);
}

export function  validate(value, validation) {


    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
    isValid = value.trim() !== '' && isValid
    }

    if (validation.phone) {
      isValid = telephoneCheck(value) && isValid
    }

     if (validation.email) {
      isValid = emailCheck(value) && isValid
    }

    if (validation.birthday) {
      isValid = birhtdayCheck(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
};

export function validateForm(formControls) {
  let isFormValid = true

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid
};