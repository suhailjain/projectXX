import firebase from 'firebase';

const fbAccess = firebase.initializeApp({
apiKey: 'AIzaSyBqDZp6QmjzvEa5MCBu1ZxLWpQwkRxNXsM',
authDomain: 'unityone-65a80.firebaseapp.com',
databaseURL: 'https://unityone-65a80.firebaseio.com',
projectId: 'unityone-65a80',
storageBucket: 'unityone-65a80.appspot.com',
messagingSenderId: '452199736775'
});

export default fbAccess;
