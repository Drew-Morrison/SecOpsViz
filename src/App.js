import React, { Component } from 'react';
import {} from 'reactstrap';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import HomePage from './Home'

function App() {
  return (
    <div>
      <Router>
      <Navigation/>
       <Switch>
        <Route path='/home' component={HomePage} /> 
        <Redirect to='/home' />
      </Switch>
      </Router>
      <Footer/>

    </div>
  );
}

class Navigation extends Component { 
  render() {
    return (
      <div className='nav-bar'>
        <div className='nav-bar-flex'> 
          <img className='logo' src='img/logo.jpeg' alt='Logo' width='40px' height='30px' />
          <Link to="/ho" className='title'> SecOpsViz </Link>
          <img className='notifications-logo' src='img/notification.jpeg' alt='Notifications' width='30px' height='30px' /> 
          <img className='profile-logo' src='img/profile.jpeg' alt='profile' width='40px' height='40px' />
        </div>
      </div>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <footer>
        <p> Fierce Null Set - iSchool Capstone 2021 </p>
      </footer>
    )
  }
}

export default App;
