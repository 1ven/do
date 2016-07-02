import md5 from 'md5';

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

export function handleReduxFormSubmit(dispatch, action, args) {
  return function(values) {
    return new Promise((resolve, reject) => {
      dispatch(action({ ...values, ...args, resolve, reject }));
    });
  };
}

export function hidePreloader() {
  const preloader = document.querySelector('.b-preloader');
  preloader.classList.add('b-preloader_hidden');
  setTimeout(() => preloader.style.display = 'none', 1050);
}

export function getGravatarUrl(email) {
  const hash = md5(email.toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}`;
}
