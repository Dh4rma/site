import { app, h } from "/modules/hyperapp.js";
import Nav from "/components/nav";
import Header from "/components/header";
import initialState from "./state.js";
import subscriptions from "./subscriptions.js";
import "./index.css";

app({
  init: initialState,
  view: ({ route }) =>
    h("div", { class: "container" }, [
      Header(),
      Nav(route.name),
      route.view(route.state),
    ]),
  subscriptions: subscriptions,
  node: document.getElementById("app"),
});
