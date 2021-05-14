import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "../App.css";

const PortTrafficViz = ({ setIPs, data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const tooltipRef = useRef();
  const srcip = "192.168.1.21";

  useEffect(() => {
    var margin = { top: 10, right: 50, bottom: 40, left: 200 };
    const width = wrapperRef.current.clientWidth,
      height = wrapperRef.current.clientHeight;
    let lookedAt = data;
    let resetter = null;
    let timeArray = data.map(
      (result) => result._source.layers.frame["frame.time_relative"]
    );

    const x_scale = d3
      .scaleLinear()
      .domain([d3.min(timeArray), d3.max(timeArray)])
      .range([margin.left, width - margin.right]);

    let lenArray = data.map((result) =>
      parseInt(result._source.layers.frame["frame.len"])
    );

    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(lenArray)])
      .range([height - margin.bottom, margin.top]);
    console.log(d3.max(lenArray));

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x_scale));

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y_scale));

    d3.selectAll("svg > *").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const tooltip = d3.select(tooltipRef.current);

    tooltip
      .attr("class", "tooltip")
      .attr("style", "position: absolute; opacity: 0;");

    svg
      .append("g")
      .call(xAxis)
      .attr("font-size", "11px")
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

    svg.append("g").call(yAxis).attr("font-size", "12px");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 1.9)
      .attr("y", margin.top - 20)
      .text("Port Traffic - Source")
      .style("font-family", "sans-serif");

    svg
      .append("text")
      .text("Time")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("font-family", "sans-serif")
      .attr("x", width / 2)
      .attr("y", height);

    svg
      .append("text")
      .text("Length")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("font-family", "sans-serif")
      .attr("x", -height / 1.7)
      .attr("y", 15)
      .attr("transform", "rotate(-90)");

    let groups = d3.group(data, (d) =>
      d._source.layers.ip["ip.src"] === srcip
        ? d._source.layers.tcp["tcp.srcport"]
        : d._source.layers.tcp["tcp.dstport"]
    );

    let keys = Array.from(groups.keys());
    const colorScale = d3
      .scaleOrdinal()
      .domain(keys)
      .range([
        "#000000",
        "#FFFF00",
        "#1CE6FF",
        "#FF34FF",
        "#FF4A46",
        "#008941",
        "#006FA6",
        "#A30059",
        "#FFDBE5",
        "#7A4900",
        "#0000A6",
        "#63FFAC",
        "#B79762",
        "#004D43",
        "#8FB0FF",
        "#997D87",
        "#5A0007",
        "#809693",
        "#FEFFE6",
        "#1B4400",
        "#4FC601",
        "#3B5DFF",
        "#4A3B53",
        "#FF2F80",
        "#61615A",
        "#BA0900",
        "#6B7900",
        "#00C2A0",
        "#FFAA92",
        "#FF90C9",
        "#B903AA",
        "#D16100",
        "#DDEFFF",
        "#000035",
        "#7B4F4B",
        "#A1C299",
        "#300018",
        "#0AA6D8",
        "#013349",
        "#00846F",
        "#372101",
        "#FFB500",
        "#C2FFED",
        "#A079BF",
        "#CC0744",
        "#C0B9B2",
        "#C2FF99",
        "#001E09",
        "#00489C",
        "#6F0062",
        "#0CBD66",
        "#EEC3FF",
        "#456D75",
        "#B77B68",
        "#7A87A1",
        "#788D66",
        "#885578",
        "#FAD09F",
        "#FF8A9A",
        "#D157A0",
        "#BEC459",
        "#456648",
        "#0086ED",
        "#886F4C",
        "#34362D",
        "#B4A8BD",
        "#00A6AA",
        "#452C2C",
        "#636375",
        "#A3C8C9",
        "#FF913F",
        "#938A81",
        "#575329",
        "#00FECF",
        "#B05B6F",
        "#8CD0FF",
        "#3B9700",
        "#04F757",
        "#C8A1A1",
        "#1E6E00",
        "#7900D7",
        "#A77500",
        "#6367A9",
        "#A05837",
        "#6B002C",
        "#772600",
        "#D790FF",
        "#9B9700",
        "#549E79",
        "#FFF69F",
        "#201625",
        "#72418F",
        "#BC23FF",
        "#99ADC0",
        "#3A2465",
        "#922329",
        "#5B4534",
        "#FDE8DC",
        "#404E55",
        "#0089A3",
        "#CB7E98",
        "#A4E804",
        "#324E72",
        "#6A3A4C",
      ]);

    svg
      .selectAll("path")
      .data(groups)
      .join("path")
      .attr("fill", "none")
      .attr("stroke-width", 4)
      .attr("stroke", (d) => colorScale(d[0]))
      .attr("d", (d) => {
        return d3
          .line()
          .x((d) => x_scale(d._source.layers.frame["frame.time_relative"]))
          .y((d) => y_scale(d._source.layers.frame["frame.len"]))(d[1]);
      })
      .on("mouseover", tooltiphere)
      .on("click", function (event, d) {
        if (resetter != d.port) {
          resetter = d.port;
          highlightEgoNetwork(event, d);
        } else {
          resetter = null;
          reset(event, d);
          lookedAt = data;
        }
      })
      .on("mouseout", function (event, d) {
        tooltipbye(event, d);
      });

    const nodeEnter = svg
      .selectAll("g.node")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return (
          "translate(" +
          x_scale(d._source.layers.frame["frame.time_relative"]) +
          "," +
          y_scale(d._source.layers.frame["frame.len"]) +
          ")"
        );
      });

    nodeEnter
      .append("circle")
      .attr("fill", "steelblue")
      .attr("r", 7)
      .on("mouseover", tooltiphere)
      .on("click", function (event, d) {
        if (resetter != d.port) {
          resetter = d.port;
          highlightEgoNetwork(event, d);
        } else {
          resetter = null;
          reset(event, d);
          lookedAt = data;
        }
      })
      .on("mouseout", function (event, d) {
        tooltipbye(event, d);
      });

    function tooltiphere(event, d) {
      if (!d.tooltip) {
        d.totalbytes = 0;
        let filteredEdges = null;
        if (Array.isArray(d)) {
          d.port = d[0];
          filteredEdges = d[1];
        } else {
          d.port =
            d._source.layers.ip["ip.src"] === srcip
              ? d._source.layers.tcp["tcp.srcport"]
              : d._source.layers.tcp["tcp.dstport"];
          filteredEdges = groups.get(d.port);
        }
        d.tooltip = true;
        filteredEdges.forEach((edge) => {
          d.totalbytes =
            d.totalbytes + parseInt(edge._source.layers.frame["frame.len"]);
        });
        d.largestTran = Math.max.apply(
          Math,
          filteredEdges.map(function (o) {
            return parseInt(o._source.layers.frame["frame.len"]);
          })
        );
        d.filteredEdges = filteredEdges;
        d.totalcomm = filteredEdges.length;
      }
      if (d.filteredEdges.every((elem) => lookedAt.includes(elem))) {
        tooltip.transition().duration(200).style("opacity", 1);

        tooltip
          .style("left", event.screenX - 250 + "px")
          .style("top", event.screenY - 180 + "px");
        tooltip.html(
          "<p>" +
            "Port Number: " +
            d.port +
            "</p>" +
            "<p id='comm'>" +
            "Total Communications: " +
            d.totalcomm +
            "</p>" +
            "<p>" +
            "Total Bytes Transferred: " +
            d.totalbytes +
            "</p>" +
            "<p>" +
            "Average Byte Transfer: " +
            Math.round(d.totalbytes / d.totalcomm) +
            "</p>" +
            "<p>" +
            "Largest Transfer: " +
            d.largestTran +
            "</p>"
        );
      }
    }

    function tooltipbye(event, d) {
      tooltip.transition().duration(0).style("opacity", 0);
      tooltip.html("");
    }

    function highlightEgoNetwork(event, d) {
      d3.selectAll("path")
        .filter(function (p) {
          return d.port != p[0];
        })
        .attr("stroke", "lightgray");

      d3.selectAll("path")
        .filter(function (p) {
          return d.port === p[0];
        })
        .attr("stroke", (p) => colorScale(p[0]));

      d3.selectAll("circle")
        .filter(function (p) {
          return d.filteredEdges.indexOf(p) === -1;
        })
        .attr("fill", "lightgray");

      d3.selectAll("circle")
        .filter(function (p) {
          return d.filteredEdges.indexOf(p) != -1;
        })
        .attr("fill", "steelblue");
      setIPs(d.filteredEdges);
      lookedAt = d.filteredEdges;
    }

    function reset(event, d) {
      d3.selectAll("path").attr("stroke", (p) => colorScale(p[0]));
      d3.selectAll("circle").attr("fill", "steelblue");
    }
  }, [data]);

  return (
    <div ref={wrapperRef} className="graph">
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef}></div>
    </div>
  );
};

export default PortTrafficViz;
