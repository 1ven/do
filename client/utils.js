export function createActions(types) {
  return {
    request(payload) {
      return {
        type: types[0],
        payload,
      };
    },
    success(payload) {
      return {
        type: types[1],
        payload,
      };
    },
    failure(error) {
      return {
        type: types[2],
        error: error || 'Something bad happened',
      };
    },
  };
}

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    return {
      ...acc,
      [constant]: constant,
    };
  }, {});
}

export function addModifiers(className, modifiers) {
  if (modifiers.length) {
    return modifiers.reduce((acc, modifier) => (
      `${acc} ${className}_${modifier}`
    ), className);
  }

  return className;
}

export function handleReduxFormError(prop) {
  return prop.error && prop.touched ? prop.error : null;
}

export function handleReduxFormSubmit(dispatch, action) {
  return function(values) {
    return new Promise((resolve, reject) => {
      dispatch(action({ ...values, resolve, reject }));
    });
  };
}
