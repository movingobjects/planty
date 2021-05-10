
export const SET_ROUTE      = 'SET_ROUTE';
export const SET_URL_PARAMS = 'SET_URL_PARAMS';

export const CONFIRM_ACTION = 'CONFIRM_ACTION';
export const CLOSE_CONFIRM  = 'CLOSE_CONFIRM';

export const setRoute = (route) => ({
  type: SET_ROUTE,
  route
});
export const setUrlParams = (params) => ({
  type: SET_URL_PARAMS,
  params
});

export const confirmAction = (opts) => ({
  type: CONFIRM_ACTION,
  opts
});
export const closeConfirm = () => ({
  type: CLOSE_CONFIRM
});
