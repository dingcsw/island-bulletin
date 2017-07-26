import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

import './style.css';
import Island from './components/Island';

const config = {
  apiKey: "AIzaSyDRegQkKqmby3FRrjEptfr6H6QxxMWc3A8",
  authDomain: "island-6d72e.firebaseapp.com",
  databaseURL: "https://island-6d72e.firebaseio.com",
  projectId: "island-6d72e",
  storageBucket: "island-6d72e.appspot.com",
  messagingSenderId: "75920336929"
};

const db = firebase  
  .initializeApp(config)
  .database()
  .ref();

const modifyTeamData = (data, id) => db.child(`teams/${id}`).update(data, response => response);
const modifyGarenaData = (data, id) => db.child(`garenas/${id}`).update(data, response => response);
const modifyEnvData = (data) => db.child(`env`).update(data, response => response);
const actions = {
  modifyTeamData,
  modifyGarenaData,
  modifyEnvData
};

db.on('value', snapshot => {  
  const store = snapshot.val();
  ReactDOM.render(
    <Island
      {...actions}
      {...store}
    />,
    document.getElementById('root')
  )
});
