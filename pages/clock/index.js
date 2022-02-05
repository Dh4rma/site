import { h, text } from "/modules/hyperapp.js";
import { dispatchAction } from "/modules/hyperapp-utils.js";
import { Interval } from "/modules/hyperapp-fx.js";

const viewClock = (state) => {
  return h("main", {}, [h("h1", {}, text(state.time))]);
};

const formatTime = (time) => {
  return time.toLocaleString("us", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

const updateTime = (state, time) => {
  return dispatchAction(state, (s) => {
    s.time = formatTime(time);
    return s;
  });
};

const Clock = {
  name: "clock",
  path: "/clock",
  view: viewClock,
  state: { time: 0 },
  onEnter: (state, _) => {
    const next = {
      ...state,
      ...{ route: Clock },
    };
    return dispatchAction(next, (s) => {
      s.time = formatTime(new Date());
      return s;
    });
  },
  onLeave: (state, _) => state,
  subs: (state) => {
    return [
      state.route.name === "clock" &&
        Interval({
          every: 1000,
          asDate: true,
          action: updateTime,
        }),
    ];
  },
};

export default Clock;
