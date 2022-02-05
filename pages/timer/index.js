import { h, text } from "/modules/hyperapp.js";
import { dispatchAction } from "/modules/hyperapp-utils.js";
import { Interval } from "/modules/hyperapp-fx.js";
import { Keyboard } from "/modules/hyperapp-fx.js";
import Button from "/components/button";

const KeySub = Keyboard({
  downs: true,
  ups: false,
  action: (state, keyEvent) => {
    switch (true) {
      case keyEvent.keyCode == 13: // Enter
        actions.toggleStop(state);
        return state;
      default:
        return state;
    }
  },
});

const state = { time: 10, stop: true };

const data = {};

const actions = {
  reset: (state) =>
    dispatchAction(state, (s) => {
      s.time = data.amount;
      s.stop = true;
      return s;
    }),
  toggleStop: (state) =>
    dispatchAction(state, (s) => {
      s.stop = !s.stop;
      return s;
    }),
};

const viewTimer = (state) => {
  return h("main", {}, [
    h("h1", {}, text(formatTime(state.time))),
    Button({
      name: state.stop ? "start" : "stop",
      props: { onclick: actions.toggleStop },
    }),
    Button({ name: "reset", props: { onclick: actions.reset } }),
  ]);
};

const formatTime = (time) => {
  return time.toLocaleString("us", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

const updateTime = (state) =>
  dispatchAction(state, (s) => {
    if (s.time === 0) {
      s.time = data.amount;
      s.stop = true;
      return s;
    } else {
      if (!s.stop) {
        s.time = s.time - 1;
      }
      return s;
    }
  });

const Timer = {
  name: "timer",
  path: "/timer/:amount",
  view: viewTimer,
  state: state,
  onEnter: (state, props) => {
    const next = {
      ...state,
      ...{ route: Timer },
    };
    return dispatchAction(next, (s) => {
      const amount = props.params.amount;
      if (amount) {
        s.time = amount;
        data.amount = amount;
      }
      return s;
    });
  },
  subs: (state) => {
    return [
      state.route.name === "timer" &&
        Interval({
          every: 1000,
          asDate: true,
          action: updateTime,
        }),
      KeySub,
    ];
  },
};

export default Timer;
