import { arrayMutations } from '~/assets/js/common/base-mutations';
import * as mutationTypes from '~/assets/js/const/store/mutation-types';
import manager from '~/assets/js/model/list/firebase/manager';

export default {
  state: {
    items: [],
  },
  mutations: {
    ...arrayMutations('items'),
  },
  actions: {
    async initialize ({ state, commit }, { listId }) {
      const items = await manager.getItems(listId);
      commit(mutationTypes.SET_LIST_ITEMS, items, { root: true });
    },
    watch ({ state, commit }, { listId }) {
      manager.watchItems(listId, state.items, { commit });
    },
  },
  namespaced: true,
};
