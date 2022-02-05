import { assign } from "../hyperapp-fx-utils.js";

function mergeEffect(dispatch, props) {
  dispatch(function (state) {
    return assign(state, props.action(state));
  });
}

export function Merge(action) {
  return [mergeEffect, { action: action }];
}
