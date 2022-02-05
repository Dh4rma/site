const defaultState = {
  route: {
    name: "",
    path: "",
    state: {},
    view: () => {},
    onEnter: (state, _) => state,
    onLeave: (state, _) => state,
    subs: () => [],
  },
};

const initialState = [defaultState];
export default initialState;
