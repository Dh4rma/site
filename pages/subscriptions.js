import Hyperway from "/modules/hyperway.js";
import Home from "/pages/home";
import routes, { routeToFx } from "/router";

const mergedSubs = (state) => {
  var res = [];
  for (var r of routes) {
    const subs = r.subs && r.subs(state);
    if (Array.isArray(subs)) {
      for (var s of subs) {
        res = [...res, s];
      }
    }
  }
  return res;
};

const subscriptions = (state) => [
  Hyperway({
    onNotFound: (state, _) => [state, routeToFx(Home.path)],
    onRoute: (state, _) => ({ ...state }),
    routes: routes,
  }),
  ...mergedSubs(state),
];

export default subscriptions;
