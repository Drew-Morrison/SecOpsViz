import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN6w-c-Ttq3MxM8Ej2HOpiC-_T7D5QUMk",
  authDomain: "secopsviz-a0f28.firebaseapp.com",
  projectId: "secopsviz-a0f28",
  storageBucket: "secopsviz-a0f28.appspot.com",
  messagingSenderId: "439911905694",
  appId: "1:439911905694:web:70346e9092851d9329be8f",
  measurementId: "G-CJFRKXEJBL"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
