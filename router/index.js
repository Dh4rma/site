import Home from "/pages/home";
import Counter from "/pages/counter";
import Clock from "/pages/clock";
import Timer from "/pages/timer";
import Pokemon from "/pages/pokemon";
import PokemonItem from "/pages/pokemon/item";
import { NAVIGATE_EVENT } from "/modules/hyperway.js";

const routes = [Home, Counter, Clock, Timer, Pokemon, PokemonItem];

export default routes;

export const navRoutes = [
  { name: Home.name, path: "/" },
  { name: Counter.name, path: "/counter" },
  { name: Clock.name, path: "/clock" },
  { name: Timer.name, path: "/timer/8" },
  { name: Pokemon.name, path: "/pokemon" },
];

const emitNavigateEvent = (_, { path, replace, event: e }) => {
  if (
    e.ctrlKey ||
    e.metaKey ||
    e.altKey ||
    e.shiftKey ||
    e.button ||
    e.defaultPrevented
  )
    return;
  e.preventDefault();
  emitEvent(NAVIGATE_EVENT, { path, replace });
};

const emitNavigate = (_, { path, replace }) => {
  emitEvent(NAVIGATE_EVENT, { path, replace });
};

const emitEvent = (name, detail) => {
  let event = new CustomEvent(name, { detail });
  dispatchEvent(event);
};

export const routeTo = (to = "/", replace = false) => {
  return (state, event) => {
    return [state, [emitNavigateEvent, { path: to, replace, event }]];
  };
};

export const routeToFx = (to) => {
  return [
    (dispatch) => {
      const action = (state) => {
        return [state, [emitNavigate, { path: to, replace: false }]];
      };
      dispatch(action);
    },
  ];
};
