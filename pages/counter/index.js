import { h, text } from "/modules/hyperapp.js";
import { dispatchAction } from "/modules/hyperapp-utils.js";
import Button from "/components/button";

const state = { count: 0, flag: false };

let data = { count: 0 };

const actions = {
  Add: (state, count) =>
    dispatchAction(state, (s) => {
      if (s.count == 0) {
        s.flag = false;
      }
      s.count = s.count + count;
      console.log(s.count);
      return s;
    }),
  Reduce: (state, count) =>
    dispatchAction(state, (s) => {
      if (s.count > 0) {
        s.count = s.count - count;
      }
      if (s.count == 0) {
        s.flag = true;
      }
      return s;
    }),
};

const Add = (state, count) => {
  data.count = data.count + count;
  return { ...state };
};

const Reduce = (state, count) => {
  if (data.count > 0) {
    data.count = data.count - count;
  }
  return { ...state };
};

const viewCounter = (state) => {
  return h("main", {}, [
    h("h2", {}, text("data count " + data.count)),
    Button({ name: "Add", props: { onclick: [Add, 1] } }),
    Button({ name: "Reduce", props: { onclick: [Reduce, 1] } }),
    h("h2", {}, text("state count " + state.count)),
    Button({ name: "Add", props: { onclick: [actions.Add, 1] } }),
    Button({ name: "Reduce", props: { onclick: [actions.Reduce, 1] } }),
    state.flag == true && h("p", {}, text("message")),
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
