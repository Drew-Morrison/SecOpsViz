import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './App.css';

class ProfilePage extends Component {
    
    render() {
    return (
        <div className='info_background'>
            <Problem/>
        </div>
    );
  }
}

class Problem extends Component {
    render() {
      return (
          <Row>
              <Col>
              <div className="profile">
              <img src="img/uw.png" alt="Profile Picture" height='200px'/>
              <h1 className='prof1'> University of Washington</h1>
              <h1 className='prof2'> Security Operations Team</h1>
              </div>
              <div className='teaminfo'>
              <h1 className='team'> Team Access </h1>
              <Row>
                <p className='people'> Team Member </p>
                <img src='img/limited.png' width='250px' height='20' className='teamimg'/>
              </Row>
              <Row>
              <p className='people'> Team Member </p>
              <img src='img/full.png' width='250px' height='20' className='teamimg'/>
              </Row>
              <Row>
              <p className='people'> Team Member </p>
              <img src='img/view.png' width='250px' height='20' className='teamimg'/>
              </Row>
              <Row>
              <p className='people'> Team Member </p>
              <img src='img/limited.png' width='250px' height='20' className='teamimg'/>
              </Row>
              <Row>
                <p className='people'> Team Member </p>
                <img src='img/full.png' width='250px' height='20' className='teamimg'/>
              </Row>
              </div>
              </Col>
              <Col>
              
              </Col>
              <Col>
              
              </Col>
          </Row>
      )
    }
  }


  export default ProfilePage