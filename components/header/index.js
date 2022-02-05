import { h } from "/modules/hyperapp.js";
import Logo from "/public/assets/logo.webp";
import styles from "./index.module.css";

const Header = () => {
  return h("img", {
    src: Logo,
    class: styles.logo,
    alt: "hyperapp-logo",
  });
};

export default Header;
