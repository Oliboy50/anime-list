export const SET = 'set_';
export const ADD_ITEM = 'addItem_';
export const UPDATE_ITEM = 'updateItem_';
export const MOVE_ITEM = 'moveItem_';
export const REMOVE_ITEM = 'removeItem_';

export const variableMutations = (key) => ({
  [SET + key] (state, value) {
    state[key] = value;
  },
});

export const arrayMutations = (key) => ({
  ...variableMutations(key),
  [ADD_ITEM + key] (state, { index, item }) {
    state[key].splice(index, 0, item);
  },
  [UPDATE_ITEM + key] (state, { index, item }) {
    state[key].splice(index, 1, item);
  },
  [MOVE_ITEM + key] (state, { index, newIndex }) {
    state[key].splice(newIndex, 0, state[key].splice(index, 1)[0]);
  },
  [REMOVE_ITEM + key] (state, { index }) {
    state[key].splice(index, 1);
  },
});
