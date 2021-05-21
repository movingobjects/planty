
export const route = (state = null, action) => {
  switch (action.type) {
    case 'setRoute':
      return action.route;
    default:
      return state;
  }
}

export const urlParams = (state = null, action) => {
  switch (action.type) {
    case 'setUrlParams':
      return action.params;
    default:
      return state;
  }
}

export const confirm = (state = null, action) => {

  switch (action.type) {

    case 'confirmAction':
      return action.opts;

    case 'closeConfirm':
      return null;

    default:
      return state;

  }

}

export const userId = (state = null, action) => {
  switch (action.type) {
    case 'setUserId':
      return action.userId;
    default:
      return state;
  }
}
