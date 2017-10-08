import {
  database,
  getBaseData,
  snapshotToObject,
  snapshotToArray,
} from '~/assets/js/common/firebase';

const getTagsRef = () => database.ref('/tags');
const getTagRefForId = (id) => database.ref(`/tags/${id}`);

export default {
  getTag (id) {
    return getTagRefForId(id)
      .once('value')
      .then(async (snapshot) => {
        return snapshotToObject(snapshot);
      });
  },
  addTag (tag) {
    database.ref('/tags').push({
      ...getBaseData(),
      ...tag,
    });
  },
  updateTag (id, tag) {
    getTagRefForId(id).update({...tag});
  },
  getTags () {
    return getTagsRef()
      .once('value')
      .then((snapshot) => snapshotToArray(snapshot));
  },
};
