
export const FETCH_TRADES_REQUEST = 'FETCH_TRADES_REQUEST';
export const FETCH_TRADES_SUCCESS = 'FETCH_TRADES_SUCCESS';
export const FETCH_TRADES_FAILURE = 'FETCH_TRADES_FAILURE';

function requestFetchTrades() {
  return {
    type: FETCH_TRADES_REQUEST,
    isFetching: true,
  };
}

function fetchTradesSuccess(trades) {
  return {
    type: FETCH_TRADES_SUCCESS,
    isFetching: false,
    trades,
  };
}

function fetchTradesError(message) {
  return {
    type: FETCH_TRADES_FAILURE,
    isFetching: false,
    message,
  };
}

export function fetchMyTrades() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  return (dispatch) => {
    dispatch(requestFetchTrades());

    return fetch('http://localhost:2929/api/my_trades?filter=%7B%22limit%22%3A10%7D', config)
      .then(response =>
        response.json().then(response => ({ trades: response, response })),
      ).then(({ trades, response }) => {
        if (!response) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(fetchTradesError(trades.trade_id));
          return Promise.reject(trades);
        }
        // Dispatch the success action
        dispatch(fetchTradesSuccess(trades));
      }).catch(err => console.log('Error: ', err));
  };
}
