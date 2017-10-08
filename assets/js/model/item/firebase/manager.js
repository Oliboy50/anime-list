import {
  database,
  getBaseData,
  snapshotToObject,
  convertRelationshipsToArray,
  convertArrayToRelationships,
} from '~/assets/js/common/firebase';

const getItemRefForId = (id) => database.ref(`/items/${id}`);

export default {
  getItem (id) {
    return getItemRefForId(id)
      .once('value')
      .then(async (snapshot) => {
        const item = snapshotToObject(snapshot);
        if (item.tags) {
          item.tags = await convertRelationshipsToArray('/tags', item.tags);
        }
        return item;
      });
  },
  addItem (item) {
    database.ref('/items').push({
      ...getBaseData(),
      ...item,
    });
  },
  updateItem (id, item) {
    const firebaseItem = {...item};
    if (firebaseItem.tags) {
      firebaseItem.tags = convertArrayToRelationships(firebaseItem.tags);
    }
    getItemRefForId(id).update(firebaseItem);
  },
};
