import React, { Component, useState } from 'react';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import * as d3 from "d3";
import SideBar from './Components/SideBar'
import './App.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dashboards: ['Dashboard 1', 'Dashboard 2', 'Dashboard 3'],
          data: [
              {   no: "1",
                  time: "0.000000", 
                  source: "10.104.9.70", 
                  dest: "128.95.155.101", 
                  prot: "TCP", 
                  length:"78",  
                  info: "52943  >  443 [SYN] Seq=0 Win=65535 Len=0 MSS=1344 WS=64 TSval=745172893 TSecr=0 SACK_PERM=1"
              },
              {
                no: "2",
                time: "0.000015", 
                source: "10.104.9.70", 
                dest: "128.95.155.101", 
                prot: "TCP", 
                length:"78",  
                info: "[TCP Out-Of-Order] 52943  >  443 [SYN] Seq=0 Win=65535 Len=0 MSS=1344 WS=64 TSval=745172893 TSecr=0 SACK_PERM=1"
            },
            {
                no: "3",
                time: "0.000295", 
                source: "128.95.155.101", 
                dest: "10.104.9.70", 
                prot: "TCP", 
                length:"74",  
                info: "443  >  52943 [SYN, ACK] Seq=0 Ack=1 Win=8192 Len=0 MSS=1460 WS=256 SACK_PERM=1 TSval=24531302 TSecr=745172893"
            },
            {
                no: "4",
                time: "0.000311", 
                source: "128.95.155.101", 
                dest: "128.95.155.101", 
                prot: "TCP", 
                length:"74",  
                info: "443  >  52943 [SYN, ACK] Seq=0 Ack=1 Win=8192 Len=0 MSS=1460 WS=256 SACK_PERM=1 TSval=24531302 TSecr=745172893"
            },
            {
                no: "5",
                time: "0.021394", 
                source: "128.95.155.101", 
                dest: "10.104.9.70", 
                prot: "TCP", 
                length:"74",  
                info: "[TCP Dup ACK 5#1] 52943  >  443 [ACK] Seq=1 Ack=1 Win=131840 Len=0 TSval=745172911 TSecr=24531302"
            },
            {
                no: "6",
                time: "0.021403", 
                source: "10.104.9.70", 
                dest: "128.95.155.101", 
                prot: "TCP", 
                length:"66",  
                info: "52943  >  443 [ACK] Seq=1 Ack=1 Win=131840 Len=0 TSval=745172911 TSecr=24531302"
            },
            {
                no: "7",
                time: "0..021403", 
                source: "10.104.9.70", 
                dest: "128.95.155.101", 
                prot: "TLSv1.2", 
                length:"583",  
                info: "Client Hello"
            },
            {
                no: "8",
                time: "0.021644", 
                source: "10.104.9.70", 
                dest: "128.95.155.101", 
                prot: "TCP", 
                length:"583",  
                info: "[TCP Retransmission] 52943  >  443 [PSH, ACK] Seq=1 Ack=1 Win=131840 Len=517 TSval=745172911 TSecr=24531302"
            },
            {
                no: "9",
                time: "0.046541", 
                source: "128.95.155.101", 
                dest: "10.104.9.70", 
                prot: "TCP", 
                length:"1398",  
                info: "443  >  52943 [ACK] Seq=1 Ack=518 Win=262400 Len=1332 TSval=24531348 TSecr=745172911 [TCP segment of a reassembled PDU]"
            },
            {
                no: "10",
                time: "0.046558", 
                source: "128.95.155.101", 
                dest: "10.104.9.70", 
                prot: "TCP", 
                length:"1398",  
                info: "[TCP Retransmission] 443  >  52943 [ACK] Seq=1 Ack=518 Win=262400 Len=1332 TSval=24531348 TSecr=745172911"
            },
            {
                no: "11",
                time: "0.682778", 
                source: "14.56.180.103", 
                dest: "128.208.4.40", 
                prot: "SSHv2", 
                length:"66",  
                info: "22  >  45266 [ACK] Seq=1078 Ack=462 Win=64896 Len=0 TSval=911407320 TSecr=406771232"
            },
            {
                no: "12",
                time: "0.682981", 
                source: "128.208.4.40", 
                dest: "14.56.180.103", 
                prot: "SSHv2", 
                length:"114",  
                info: "Client: Elliptic Curve Diffie-Hellman Key Exchange Init"
            },
            {
                no: "13",
                time: "0.693825", 
                source: "128.208.4.40", 
                dest: "14.56.180.103", 
                prot: "TCP", 
                length:"66",  
                info:"22  >  45266 [ACK] Seq=1078 Ack=510 Win=64896 Len=0 TSval=911407488 TSecr=406771398",
            },
            {
                no: "14",
                time: "0.865711", 
                source: "14.56.180.103", 
                dest: "128.208.4.40", 
                prot: "SSHv2", 
                length:"114",  
                info: "22  >  45266 [ACK] Seq=1358 Ack=526 Win=64896 Len=0 TSval=911407670 TSecr=406771582"
            },
            {
                no: "15",
                time: "0.865906", 
                source: "128.208.4.40", 
                dest: "14.56.180.103", 
                prot: "SSHv2", 
                length:"118",  
                info: "Client: Encrypted packet (len=52)"
            },
          ],
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
                        {/*<p className='open'> This project is transitioning to open source effective Jun 10th, 2021</p>*/}
                    <Row>
                        <Col xs='4'> 
                        <FilterFile state={this.state}/> 
                        </Col>
                        <Col xs='3'> 
                        <FilterTime /> 
                        </Col>
                        <Col xs='3'> 
                        <FilterPcap /> 
                        </Col>
                    </Row>
                    <Table data={this.state.data} /> 
                    <Row>
                    <RenderGraphs/>
                    </Row>

                </Col>

            </Row>
        </div>
    );
  }
}

const Table = ({data}) => {
    
    // Filter IP
    const [srcIP, setSrcIP] = useState('');
    const [destIP, setDestIP] = useState('');
    var filterip =  data.filter(function(src) {
        if (srcIP !== ''){
            return src.source == srcIP;
        } 
        else if (destIP !== '') {
            return src.dest == destIP
        }
        else {
            return data
        }
    });

    let table_array = [];
    filterip.forEach((request) => {
            table_array.push(
                <tr>
                    <td> {request['no']} </td>
                    <td> {request['time']} </td>
                    <td onClick={() => setSrcIP(request['source'])}> {request['source']} </td>
                    <td onClick={() => setDestIP(request['dest'])}> {request['dest']} </td>
                    <td> {request['prot']} </td>
                    <td> {request['length']} </td>
                    <td> {request['info']} </td>
                </tr>
            )
    });
    

    return (
        <div className='data'> 
            <table>
            <tr>
                <th> No </th>
                <th> Time </th>
                <th onClick={() => setSrcIP('')}> Source </th>
                <th onClick={() => setDestIP('')}> Destination </th>
                <th> Protocol </th>
                <th> Length </th>
                <th> Info </th>
            </tr>
            {table_array}
            </table>
        </div>
    )
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
    const [file, setFile] = useState('pcap.file');
  
    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="light" className='filter-dropdown'>
          {file}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setFile('pcap2.file')} >pcap2.file</DropdownItem>
          <DropdownItem onClick={() => setFile('pcap1.file')} >pcap1.file</DropdownItem>
          <DropdownItem onClick={() => setFile('pcap.file')} >pcap.file</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>add new file...</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  const FilterTime = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [time, setTime] = useState('This Week');
  
    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="light" className='filter-dropdown'>
          {time}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setTime('Hourly')}>Hourly</DropdownItem>
          <DropdownItem onClick={() => setTime('Today')}>Today</DropdownItem>
          <DropdownItem onClick={() => setTime('Yesterday')}>Yesterday</DropdownItem>
          <DropdownItem onClick={() => setTime('Last 7 Days')}>Last 7 Days</DropdownItem>
          <DropdownItem onClick={() => setTime('Last 14 Days')}>Last 14 Days</DropdownItem>
          <DropdownItem onClick={() => setTime('This Week')}>This Week</DropdownItem>
          <DropdownItem onClick={() => setTime('This Month')}>This Month</DropdownItem>
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

  const RenderGraphs = (props) => {
  
    return (
      <div className="graphs">
        <Row>
          <Col xs="6">
            {/* <a href="https://observablehq.com/@alicezhu11/pcap"> */}
            {/* <Link to="/porttrafficvizpage"> */}
              <img src="img/porttraffic.jpeg" width="75%" />
            {/* </Link> */}
            {/* </a> */}
          </Col>
          <Col xs="6">
            <Link to="/hostcomvizpage">
              <img src="img/hostcommunication.jpeg" width="75%" />
            </Link>
          </Col>
        </Row>
      </div>
    );
  }

  export default Home;