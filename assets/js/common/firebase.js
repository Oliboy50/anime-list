import firebase from 'firebase';

const app = !firebase.apps.length
  ? firebase.initializeApp({
    apiKey: process.env.firebase_apiKey,
    authDomain: process.env.firebase_authDomain,
    databaseURL: process.env.firebase_databaseURL,
    projectId: process.env.firebase_projectId,
    storageBucket: process.env.firebase_storageBucket,
    messagingSenderId: process.env.firebase_messagingSenderId,
  })
  : firebase.app()
;

/*
 * Services
 */
export const database = app.database();
export const timestamp = firebase.database.ServerValue.TIMESTAMP;

/*
 * Helpers
 */
/**
 * Return data to set on all persisted objects
 */
export function getBaseData () {
  return {
    createdAt: timestamp,
  };
};

/**
 * Extract object from snapshot and add "id" property
 */
export function snapshotToObject (snapshot) {
  return {
    id: snapshot.key,
    ...snapshot.val(),
  };
};

/**
 * Extract array of object from snapshot
 */
export function snapshotToArray (snapshot) {
  const results = [];

  snapshot.forEach((childSnapshot) => {
    results.push(snapshotToObject(childSnapshot));
  });

  return results;
};

/**
 * Retrieve the index of an object with "id" property from given array
 */
export function indexForId (array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]['id'] === id) {
      return i;
    }
  }

  return -1;
};

/**
 * Convert object to relationship (e.g. a full object becomes a simple { OBJECT_ID: true })
 */
export function convertObjectToRelationship (object, additionalRelationshipData) {
  return {
    [object.id]: {
      ...getBaseData(),
      ...(additionalRelationshipData || {}),
    },
  };
};

/**
 * Convert array of objects to relationships (possible to add additional relationship data by object mapped by their index)
 */
export function convertArrayToRelationships (array, arrayOfAdditionalRelationshipData = []) {
  let relationShips = {};

  array.forEach((object, index) => {
    relationShips = {
      ...relationShips,
      ...convertObjectToRelationship(object, arrayOfAdditionalRelationshipData[index]),
    };
  });

  return relationShips;
};

/**
 * Convert relationships to an array of objects
 */
export async function convertRelationshipsToArray (refPath, relationships) {
  const array = [];

  for (const id of Object.keys(relationships)) {
    array.push(
      await database.ref(`${refPath}/${id}`).once('value').then(snapshot => snapshotToObject(snapshot))
    );
  }

  return array;
};
