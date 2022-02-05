import Link from "/components/link";
import { h } from "/modules/hyperapp.js";
import { navRoutes } from "/router";
import styles from "./index.module.css";

const Nav = (view) =>
  h(
    "div",
    { class: styles.links },
    navRoutes.map((route) =>
      h("div", { class: styles.link }, [
        Link({ to: route.path, is: view == route.name }, route.name),
      ])
    )
  );

export default Nav;
