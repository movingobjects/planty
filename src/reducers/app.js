
import * as actions from '~/src/actions';

export const route = (state = null, action) => {
  switch (action.type) {
    case actions.SET_ROUTE:
      return action.route;
    default:
      return state;
  }
}

export const confirm = (state = null, action) => {

  switch (action.type) {

    case actions.CONFIRM_ACTION:
      return action.opts;

    case actions.CLOSE_CONFIRM:
      return null;

    default:
      return state;

  }

}
