import React, { useMemo } from "react";
import MDTable from "./MDTable";

const MoreDeets = ({ DATA }) => {
  const cols = useMemo(
    () => [
      {
        Header: "Frame",
        accessor: (data) => {
          return data._source.layers.frame["frame.number"];
        },
      },
      {
        Header: "Source IP",
        accessor: (data) => {
          return data._source.layers.ip["ip.src"];
        },
      },
      {
        Header: "Source Port",
        accessor: (data) => {
          return data._source.layers.tcp["tcp.srcport"];
        },
      },
      {
        Header: "Dest IP",
        accessor: (data) => {
          return data._source.layers.ip["ip.dst"];
        },
      },
      {
        Header: "Dest Port",
        accessor: (data) => {
          return data._source.layers.tcp["tcp.dstport"];
        },
      },
      {
        Header: "Length",
        accessor: (data) => {
          return data._source.layers.frame["frame.len"];
        },
      },
      {
        Header: "Protocol",
        accessor: (data) => {
          return data._source.layers.frame["frame.coloring_rule.string"];
        },
      },
    ],
    [DATA]
  );

  return (
    <div className="deets">
      <MDTable DATA={DATA} COLUMNS={cols} />
    </div>
  );
};

export default MoreDeets;
