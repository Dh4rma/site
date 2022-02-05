import { h, text } from "/modules/hyperapp.js";
import { dispatchAction } from "/modules/hyperapp-utils.js";
import Button from "/components/button";

const state = { count: 0 };

let data = { count: 0 };

const actions = {
  Add: (state, count) =>
    dispatchAction(state, (s) => {
      s.count = s.count + count;
      return s;
    }),
  Reduce: (state, count) =>
    dispatchAction(state, (s) => {
      s.count = s.count - count;
      return s;
    }),
};

const Add = (state, count) => {
  data.count = data.count + count;
  return { ...state };
};

const Reduce = (state, count) => {
  data.count = data.count - count;
  return { ...state };
};

const viewCounter = (state) => {
  return h("main", {}, [
    h("h2", {}, text("data count " + data.count)),
    Button({ name: "Add", props: { onclick: [Add, 2] } }),
    Button({ name: "Reduce", props: { onclick: [Reduce, 2] } }),
    h("h2", {}, text("state count " + state.count)),
    Button({ name: "Add", props: { onclick: [actions.Add, 2] } }),
    Button({ name: "Reduce", props: { onclick: [actions.Reduce, 2] } }),
  ]);
};

const Counter = {
  name: "counter",
  path: "/counter",
  view: viewCounter,
  state: state,
  actions: actions,
  onEnter: (state, _) => ({
    ...state,
    ...{ route: Counter },
  }),
  onLeave: (state, _) => state,
  subs: () => [],
};

export default Counter;
