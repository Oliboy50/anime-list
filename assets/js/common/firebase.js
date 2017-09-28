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
export const base = firebase;
export const database = app.database();

/*
 * Helpers
 */
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
export function indexForKey (array, key) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]['id'] === key) {
      return i;
    }
  }

  return -1;
};
