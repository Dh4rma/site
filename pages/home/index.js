import { h, text } from "/modules/hyperapp.js";
import styles from "./index.module.css";

const viewHome = () => {
  return h("main", { class: styles.links }, [
    h("div", { class: styles.link }, [
      h(
        "a",
        {
          href: "https://github.com/jorgebucaran/hyperapp",
          target: "_blank",
        },
        text("Learn Hyperapp")
      ),
    ]),
    h("div", { class: styles.link }, [
      h(
        "a",
        {
          href: "https://github.com/kis9a/esbuild-hyperapp",
          target: "_blank",
        },
        text("Repository")
      ),
    ]),
  ]);
};

const Home = {
  name: "home",
  path: "/",
  view: viewHome,
  state: {},
  onEnter: (state, _) => ({
    ...state,
    ...{ route: Home },
  }),
  onLeave: (state, _) => state,
  subs: () => [],
};

export default Home;
