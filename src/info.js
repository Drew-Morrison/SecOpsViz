import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './App.css';

class Info extends Component {
    
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
          <div> 
            <iframe src="img/Landing.pdf#toolbar=0" width='100%' height='900px'></iframe>
          </div>
      )
    }
  }


  export default Info