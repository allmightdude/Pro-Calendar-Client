import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD91GzHMEq5ifIsUS6tabWyGXO0pgfH8yw",

  authDomain: "pro-calendar-3018b.firebaseapp.com",

  databaseURL: "https://pro-calendar-3018b-default-rtdb.firebaseio.com",

  projectId: "pro-calendar-3018b",

  storageBucket: "pro-calendar-3018b.appspot.com",

  messagingSenderId: "483061993595",

  appId: "1:483061993595:web:ddf4b2ae76499eb50852de",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
