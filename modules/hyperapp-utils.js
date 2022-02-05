export const dispatchAction = (state, func) => ({
  ...state,
  ...func(state.route.state),
});

export const tick = (action) => [
  (dispatch) => {
    dispatch(action);
    return () => {};
  },
  { action },
];
