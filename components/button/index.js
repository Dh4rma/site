import { h, text } from "/modules/hyperapp.js";
import styles from "index.module.css";

const Button = ({ name = "button", props }) => {
  return h("button", { class: styles.button, ...props }, text(name));
};

export default Button;
