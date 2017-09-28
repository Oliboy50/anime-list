import Vuex from 'vuex';

import list from './modules/list';

export default () => {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      list,
    },
  });
};
