import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "../App.css";

const PortTrafficViz = (data) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    var margin = { top: 10, right: 0, bottom: 40, left: 200 };
    const width = wrapperRef.current.clientWidth,
      height = wrapperRef.current.clientHeight;

    const x_scale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.Time), d3.max(data, (d) => d.Time)])
      .range([margin.left, width - margin.right]);

    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.min(data, (d) => d.Length)])
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x_scale));

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y_scale));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

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

    svg
      .append("path")
      .datum(source_ip_data)
      .attr("stroke", "#FF687E")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x_scale(+d.Time))
          .y((d) => y_scale(+d.Length))
      );

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

    svg
      .append("path")
      .datum(source_ip_data)
      .attr("stroke", "#FF687E")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x_scale(+d.Time))
          .y((d) => y_scale(+d.Length))
      );

    svg
      .append("g")
      .selectAll("circle")
      .data(source_ip_data)
      .join("circle")
      .attr("cx", (d) => x_scale(+d.Time))
      .attr("cy", (d) => y_scale(+d.Length))
      .attr("r", 3)
      .attr("fill", "#FF687E");
    svg
      .append("g")
      .selectAll("circle")
      .data(source_ip_data)
      .join("circle")
      .attr("cx", (d) => x_scale(+d.Time))
      .attr("cy", (d) => y_scale(+d.Length))
      .attr("r", 3)
      .attr("fill", "#FF687E");
  }, [data]);

  return (
    <div ref={wrapperRef} className="graph">
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef}></div>
    </div>
  );
};

export default PortTrafficViz;
