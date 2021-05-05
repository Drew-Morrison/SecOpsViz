import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './App.css';

class Info extends Component {
    
    render() {
    return (
        <div className='info_background'>
            <Problem/>
            <Team/>
        </div>
    );
  }
}

class Problem extends Component {
    render() {
      return (
          <div className='info_page'> 
            <h1> Project Overview: </h1>
            <p>  The security industry is rapidly developing and changing, creating a knowledge gap and skills shortage due to the challenging learning curve. SecOps analysts often burnout within the first 18 months of employment. Visualizations will help mitigate these issues so that security incidents are more quickly identified, investigated, and mitigated through pattern or trend anomalies. </p>
            <p> Our research has shown that currently, there is no standing network protocol analysis visualization tool for SecOps teams to leverage during the incident response process. Instead they must rely on asking other analysts or Wireshark’s I/O Graphics feature which requires a robust learning curve and is visually unhelpful. Additionally, visualizations help expedite the speed of identifying security gaps that may have been missed or taken a significant amount of time to come across. Analysts and students also often struggle with the overwhelming amount of data typical network analysis tools display which in turn contributes to a time consuming onboarding process and learning curve.</p>
            <h1> Target Stakeholders: </h1>
            <p> 
                <li> Cyberanalysts/SecOps Analysts who hunt for cybersecurity incidents </li>
                <li> Processors who want to use visualizations to better teach students what an incident may look like and how to investigate it </li>
                <li> Students who are beginning their careers as cybersecurity analysts</li>
            </p>
            <h1> Mission: </h1>
            <p> The SecOps Visualization tool will allow SecOps analysts to read and dynamically visualize packet logs leading to faster identification, investigation, and mitigation KPI’s. Analysts may use visualizations to add meaning to documentation, present to execs, and onboard employees. The design of the SecOps visualization tool includes a raw data dashboard and two visualizations for port traffic and network connections. The analysts have easy access to filter down through the raw data dashboard and eliminate noise before investigating further events through the visualizations. This allows security incidents to be more quickly identified, investigated, and mitigated through pattern or trend anomalies.  </p>
            <h1> Meet the Team: </h1>
          </div>
      )
    }
  }

  class Team extends Component {
      render() {
        return (
            <div className='team'> 
                <Row>
                    <Col className='photo'>
                        <img src='/img/alice.jpg' width='200px' height='200px'/>
                        <h1> Alice Zhu </h1>
                        <p> Project Manager Extraordinaire </p>
                    </Col>
                    <Col className='photo'>
                        <img src='/img/dorthy.jpg' width='200px' height='200px'/>
                        <h1> Dorthy Lu </h1>
                        <p> Exemplary UX Designer </p>
                    </Col>
                    <Col  className='photo'>
                        <img src='/img/tanner.jpg' width='200px' height='200px'/>
                        <h1> Tanner Kooistra </h1>
                        <p> Software Engineer </p>
                    </Col>
                    <Col className='photo'>
                        <img src='/img/dan.jpg' width='200px' height='200px'/>
                        <h1> Dan Lu </h1>
                        <p> Magnificent Software Engineer </p>
                    </Col>
                </Row>
            </div>
        )
      }
  }

  export default Info;