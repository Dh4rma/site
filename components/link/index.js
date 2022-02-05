import { h, text } from "/modules/hyperapp.js";
import { routeTo } from "/router";
import styles from "./index.module.css";

const Link = ({ to, is }, t) =>
  h(
    "a",
    {
      class: `${styles.link} ${is ? styles.linkDisable : ""}`,
      onclick: routeTo(to),
    },
    text(t)
  );

export default Link;
