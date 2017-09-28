import { database, base, snapshotToObject } from '~/assets/js/common/firebase';

const getItemRefForId = (id) => database.ref(`/items/${id}`);

export default {
  getItem (itemId) {
    return getItemRefForId(itemId)
      .once('value')
      .then((snapshot) => snapshotToObject(snapshot));
  },
  addItem (item) {
    database.ref('/items').push({
      createdAt: base.database.ServerValue.TIMESTAMP,
      ...item,
    });
  },
  updateItem (id, item) {
    database.ref(`/items/${id}`).update(item);
  },
};
