import { database, snapshotToObject, snapshotToArray, indexForKey } from '~/assets/js/common/firebase';
import * as mutationTypes from '~/assets/js/const/store/mutation-types';

// itemsRef.push({
//   title: 'tutu',
//   createdAt: base.database.ServerValue.TIMESTAMP,
// });

const getItemsRefForListId = (listId) => database.ref(`/lists/${listId}/items`);

export default {
  getItems (listId) {
    return getItemsRefForListId(listId)
      .orderByChild('createdAt')
      .once('value')
      .then((snapshot) => snapshotToArray(snapshot));
  },
  watchItems (listId, items, { commit }) {
    const ref = getItemsRefForListId(listId);
    let query = ref.orderByChild('createdAt');

    // Support watching existing list (the first child of query is the last one inserted)
    let isNextShouldBeAdded = true;
    if (items.length) {
      isNextShouldBeAdded = false;
      query = query.startAt(
        items[items.length - 1].createdAt,
        items[items.length - 1].id
      );
    }
    query.on('child_added', (childSnapshot, prevKey) => {
      if (!isNextShouldBeAdded) {
        isNextShouldBeAdded = true;
        return;
      }
      const index = prevKey ? indexForKey(items, prevKey) + 1 : 0;
      const item = snapshotToObject(childSnapshot);
      console.log('added: ', item);
      commit(mutationTypes.ADD_ITEM_LIST_ITEMS, { index, item }, { root: true });
    });

    ref.on('child_changed', (childSnapshot) => {
      const index = indexForKey(items, childSnapshot.key);
      const item = snapshotToObject(childSnapshot);
      console.log('changed : ', item);
      commit(mutationTypes.UPDATE_ITEM_LIST_ITEMS, { index, item }, { root: true });
    });

    ref.on('child_removed', (childSnapshot) => {
      const index = indexForKey(items, childSnapshot.key);
      console.log('removed : ', childSnapshot.key);
      commit(mutationTypes.REMOVE_ITEM_LIST_ITEMS, { index }, { root: true });
    });
  },
};
