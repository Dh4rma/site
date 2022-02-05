import { h } from "/modules/hyperapp.js";
import { Http } from "/modules/hyperapp-fx";
import { dispatchAction } from "/modules/hyperapp-utils.js";
import styles from "index.module.css";
import Link from "/components/link";
import Button from "/components/button";

const actions = {
  next: (state, uri) => {
    return [state, getPokemons(uri)];
  },
  previous: (state, uri) => {
    return [state, getPokemons(uri)];
  },
};

const viewPokemon = (state) => {
  return h("main", {}, [
    h(
      "div",
      { class: styles.pokemons },
      state.pokemons &&
        state.pokemons.map((pokemon) =>
          h(
            "div",
            { class: styles.pokemon },
            Link({ to: "/pokemon/" + pokemon.name }, pokemon.name)
          )
        )
    ),
    Button({
      name: "previous",
      props: {
        onclick: [actions.previous, state.previous],
      },
    }),
    Button({
      name: "next",
      props: {
        onclick: [actions.next, state.next],
      },
    }),
  ]);
};

const getPokemons = (uri) =>
  Http({
    url: uri,
    response: "json",
    action: (state, res) => {
      return dispatchAction(state, (s) => {
        s.pokemons = res.results;
        s.next = res.next;
        s.previous = res.previous;
        return s;
      });
    },
  });

const Pokemon = {
  name: "pokemon",
  path: "/pokemon",
  view: viewPokemon,
  state: { pokemons: [], next: "", previous: "" },
  onEnter: (state) => {
    const next = {
      ...state,
      ...{ route: Pokemon },
    };
    return [
      next,
      getPokemons("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"),
    ];
  },
  subs: () => {
    return [];
  },
};

export default Pokemon;
