import * as firebase from "firebase";
const config = {
  apiKey: "AIzaSyDdtjhsoEDFiDj-GDzMoDHSbSts0GUcoAg",
  authDomain: "demos-357de.firebaseapp.com",
  databaseURL: "https://demos-357de.firebaseio.com",
  projectId: "demos-357de",
  storageBucket: "demos-357de.appspot.com",
  messagingSenderId: "508178408657"
  };
  
  firebase.initializeApp(config);

  export default firebase;