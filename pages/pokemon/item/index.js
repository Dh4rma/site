import { h, text } from "/modules/hyperapp.js";
import { Http } from "/modules/hyperapp-fx";
import { dispatchAction } from "/modules/hyperapp-utils.js";
import styles from "index.module.css";
import Link from "/components/link";

const viewPokemonItem = (state) => {
  return h("main", {}, [
    state.pokemon &&
      h("div", {}, [
        h("h1", { class: styles.name }, text(state.pokemon.name)),
        state.pokemon.sprites &&
          h("img", {
            alt: state.pokemon.name,
            src: state.pokemon.sprites?.front_default,
            class: styles.img,
          }),
      ]),
    Link({ to: "/pokemon" }, "back"),
  ]);
};

const getPokemon = (id) =>
  Http({
    url: "https://pokeapi.co/api/v2/pokemon/" + id,
    response: "json",
    action: (state, res) => {
      return dispatchAction(state, (s) => {
        s.pokemon = res;
        return s;
      });
    },
  });

const PokemonItem = {
  name: "pokemon",
  path: "/pokemon/:id",
  view: viewPokemonItem,
  state: { pokemon: { name: "" } },
  onEnter: (state, props) => {
    const next = {
      ...state,
      ...{ route: PokemonItem },
    };
    return [next, getPokemon(props.params.id)];
  },
  subs: () => {
    return [];
  },
};

export default PokemonItem;
