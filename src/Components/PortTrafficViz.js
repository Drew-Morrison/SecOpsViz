import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "../App.css";

const PortTrafficViz = (data) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const tooltipRef = useRef();
  const srcip = "192.168.1.21";

  useEffect(() => {
    var margin = { top: 10, right: 50, bottom: 40, left: 200 };
    const width = wrapperRef.current.clientWidth,
      height = wrapperRef.current.clientHeight;
    console.log(data.data);
    let dat = data.data;
    let timeArray = data.data.map(
      (result) => result._source.layers.frame["frame.time_relative"]
    );

    const x_scale = d3
      .scaleLinear()
      .domain([d3.min(timeArray), d3.max(timeArray)])
      .range([margin.left, width - margin.right]);

    let lenArray = data.data.map(
      (result) => parseInt(result._source.layers.tcp["tcp.len"])
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
      .attr("height", height)
      .call(
        d3.zoom().on("zoom", function (event, d) {
          svg.attr("transform", event.transform);
        })
      )
      .on("dblclick.zoom", null)
      .append("g");

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

    let groups = d3.group(dat, (d) =>
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
      .attr("stroke-width", 2)
      .attr("stroke", (d) => colorScale(d[0]))
      .attr("d", d => {
        return d3
          .line()
          .x(d => x_scale(d._source.layers.frame["frame.time_relative"]))
          .y(d => y_scale(d._source.layers.tcp["tcp.len"]))
          (d[1])
      });

    const nodeEnter = svg
      .selectAll("g.node")
      .data(dat)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return (
          "translate(" +
          x_scale(d._source.layers.frame["frame.time_relative"]) +
          "," +
          y_scale(d._source.layers.tcp["tcp.len"]) +
          ")"
        );
      });

    nodeEnter.append("circle").attr("fill", "#9ED2FF").attr("r", 5);

    function tooltiphere(event, d) {
      if (!d.tooltip) {
        let filtered_edges = null;
        if (d.type === "node") {
          filtered_edges = d.edges;
        } else {
          if (d.target.totalcomm < d.source.totalcomm) {
            filtered_edges = d.target.edges.filter(
              (edge) =>
                edge._source.layers.ip["ip.dst"] === d.source.id ||
                edge._source.layers.ip["ip.src"] === d.source.id
            );
          } else {
            filtered_edges = d.source.edges.filter(
              (edge) =>
                edge._source.layers.ip["ip.dst"] === d.target.id ||
                edge._source.layers.ip["ip.src"] === d.target.id
            );
          }
          d.totalcomm = filtered_edges.length;
        }
        d.tooltip = true;
        filtered_edges.forEach((edge) => {
          d.totalbytes =
            d.totalbytes + parseInt(edge._source.layers.tcp["tcp.len"]);
        });
        d.largestTran = Math.max.apply(
          Math,
          filtered_edges.map(function (o) {
            return parseInt(o._source.layers.tcp["tcp.len"]);
          })
        );
        d.filtered_edges = filtered_edges;
      }
      tooltip.transition().duration(200).style("opacity", 1);

      tooltip
        .style("left", event.screenX - 250 + "px")
        .style("top", event.screenY - 180 + "px");
      tooltip.html(
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

    function tooltipbye(d) {
      tooltip.transition().duration(0).style("opacity", 0);
      tooltip.html("");
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
