import React, { Component, useState } from 'react';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './App.css';
import * as d3 from 'd3';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dashboards: ['Dashboard 1', 'Dashboard 2', 'Dashboard 3'],
        };
      }
    
    render() {
    return (
        <div>
            <Row>
                <Col xs='2' className='sidebar'>
                    <Folder/>
                    <SideBar dashboards={this.state.dashboards} />
                </Col>
                <Col className='filter-panel'>
                    <Row>
                        <Col xs='4'> 
                        <FilterFile /> 
                        </Col>
                        <Col xs='3'> 
                        <FilterTime /> 
                        </Col>
                        <Col xs='3'> 
                        <FilterPcap /> 
                        </Col>
                    </Row>
                    <RenderData/>
                    <Row>
                    <RenderGraphs/>
                    </Row>

                </Col>

            </Row>
        </div>
    );
  }
}

  const Folder = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
  
    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret className='folder-dropdown' color="light">
          Folder
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Demo Folder 1</DropdownItem>
          <DropdownItem>Demo Folder 2</DropdownItem>
          <DropdownItem>Demo Folder 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  const FilterFile = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
  
    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="light" className='filter-dropdown'>
          pcap.file
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>pcap2.file</DropdownItem>
          <DropdownItem>pcap1.fie</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>add new file...</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  const FilterTime = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
  
    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="light" className='filter-dropdown'>
          This Week
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Hourly</DropdownItem>
          <DropdownItem>Today</DropdownItem>
          <DropdownItem>Yesterday</DropdownItem>
          <DropdownItem>Last 7 Days</DropdownItem>
          <DropdownItem>Last 14 Days</DropdownItem>
          <DropdownItem>This Week</DropdownItem>
          <DropdownItem>This Month</DropdownItem>
          <DropdownItem>Custom</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
              <img src='img/month.jpeg'></img>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  const FilterPcap = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
  
    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="light" className='filter-dropdown'>
          Filter File
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Filter by condition</DropdownItem>
          <DropdownItem>Filter by value</DropdownItem>
          <DropdownItem>Custom...</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  const SideBar = ({ dashboards }) => {
    const dashboard_array = [];
    dashboards.forEach((board) => {
      dashboard_array.push (
        <div className='sidebar-links' key={board}>
          <img src="img/icon.jpg" alt='Dashboard logo' width='25px' height='25px' className='board-logo' />
          <h2 className='board-header'> {board} </h2>
        </div>
      )
    })
  
  
    return (
      <div className='row'> 
          <div className='side-col'>
            {dashboard_array}
            {/* <div className='sidebar-links' key='DanTest'>
              <img src="img/icon.jpg" alt='Dashboard logo' width='25px' height='25px' className='board-logo' />
              <h2 className='board-header'> 
                <Link to="/hostcomvizpage">Test</Link>
              </h2>
            </div>
  
            <div className='sidebar-links' key='DanTest'>
              <img src="img/icon.jpg" alt='Dashboard logo' width='25px' height='25px' className='board-logo' />
              <h2 className='board-header'> 
                <Link to="/devdestress">DESTRESS</Link>
              </h2>
            </div> */}
        </div>
      </div>
    )
  }

  const RenderData = (props) => {
  
    return (
      <div className='data'>
          <img src='img/pcap.jpeg' width='80%' height='100%'></img>
      </div>
    );
  }

  const RenderGraphs = (props) => {
  
    return (
      <div className='graphs'>
          <Row>
              <Col xs='6'>
                  <a href='https://observablehq.com/@alicezhu11/pcap'>
                <img src='img/porttraffic.jpeg' width='75%'/>
                </a>
              </Col>
              <Col xs='6'>
                <img src='img/hostcommunication.jpeg' width='75%'/>
              </Col>
          </Row>
      </div>
    );
  }

  export default Home;