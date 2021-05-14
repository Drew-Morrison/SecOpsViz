import SideBar from "./SideBar";
// import data from "./data.csv";
import { Link } from "react-router-dom";
import data from "./test.json"

import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useRef, useState } from "react";
import REE_DATA from "./test - Copy.json";
import PortTrafficViz from "./PortTrafficViz";
import MoreDeets from "./MoreDeets";

const PortTrafficVizPage = ({ dashboards }) => {
  const [ips, setIps] = useState(REE_DATA);
  const divRef = useRef();

  return (
    <div className="test">
      <Row className="test2">
        <Col xs="2" className="sidebar">
          <Folder />
          <SideBar dashboards={dashboards} />
        </Col>
        <Col className="filter-panel main-body">
          {/*<p className='open'> This project is transitioning to open source effective Jun 10th, 2021</p>*/}
          <Row>
            <Col xs="4">
              <FilterFile state={REE_DATA} />
            </Col>
            <Col xs="3">
              <FilterTime />
            </Col>
            <Col xs="3">
              <FilterPcap />
            </Col>
          </Row>
          <PortTrafficViz setIPs={(IPs) => setIps(IPs)} data={data} />
          <MoreDeets DATA={ips} />
        </Col>
      </Row>
    </div>
  );
};

const Folder = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className="folder-dropdown" color="light">
        Folder
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Demo Folder 1</DropdownItem>
        <DropdownItem>Demo Folder 2</DropdownItem>
        <DropdownItem>Demo Folder 3</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const FilterFile = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [file, setFile] = useState("pcap.file");

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret color="light" className="filter-dropdown">
        {file}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => setFile("pcap2.file")}>
          pcap2.file
        </DropdownItem>
        <DropdownItem onClick={() => setFile("pcap1.file")}>
          pcap1.file
        </DropdownItem>
        <DropdownItem onClick={() => setFile("pcap.file")}>
          pcap.file
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>add new file...</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const FilterTime = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [time, setTime] = useState("This Week");

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret color="light" className="filter-dropdown">
        {time}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => setTime("Hourly")}>Hourly</DropdownItem>
        <DropdownItem onClick={() => setTime("Today")}>Today</DropdownItem>
        <DropdownItem onClick={() => setTime("Yesterday")}>
          Yesterday
        </DropdownItem>
        <DropdownItem onClick={() => setTime("Last 7 Days")}>
          Last 7 Days
        </DropdownItem>
        <DropdownItem onClick={() => setTime("Last 14 Days")}>
          Last 14 Days
        </DropdownItem>
        <DropdownItem onClick={() => setTime("This Week")}>
          This Week
        </DropdownItem>
        <DropdownItem onClick={() => setTime("This Month")}>
          This Month
        </DropdownItem>
        <DropdownItem>Custom</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <img src="img/month.jpeg"></img>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const FilterPcap = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret color="light" className="filter-dropdown">
        Filter File
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Filter by condition</DropdownItem>
        <DropdownItem>Filter by value</DropdownItem>
        <DropdownItem>Custom...</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const RenderGraphs = (props) => {
  return (
    <div className="graphs">
      <Row>
        <Col xs="6">
          <a href="https://observablehq.com/@alicezhu11/pcap">
            <img src="img/porttraffic.jpeg" width="75%" />
          </a>
        </Col>
        <Col xs="6">
          <Link to="/hostcomvizpage">
            <img src="img/hostcommunication.jpeg" width="75%" />
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default PortTrafficVizPage;
