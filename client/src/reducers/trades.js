import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE,
} from '../actions/myTrades';

export default function trades(state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        trades: action.trades,
      });
    case FETCH_POSTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Something wrong happened. Please come back later',
      });
    default:
      return state;
  }
}
