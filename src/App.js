import React, { Component } from 'react';
import {} from 'reactstrap';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import HomePage from './Home'
import InfoPage from './info'

function App() {
  return (
    <div>
      <Router>
      <Navigation/>
       <Switch>
        <Route path='/home' component={HomePage} /> 
        <Route path='/info' component={InfoPage} /> 
        <Redirect to='/home' component={HomePage} />
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
          <Link to="/home"><img className='logo' src='img/Logo.png' alt='Logo' width='150px' height='40px' /> </Link>
          {/* <Link to="/home" className='title'> About </Link> */}
          <Link to="/info"><img className='info-logo' src='img/info.png' alt='About' width='35px' height='35px' /> </Link>
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
        <p className='footer_text'> Fierce Null Set - iSchool Capstone 2021 </p>
      </footer>
    )
  }
}

export default App;
