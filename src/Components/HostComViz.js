import { useRef, useEffect } from "react";
import * as d3 from "d3";
import "../App.css";

const HostComViz = ({ setIPs }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const width = wrapperRef.current.clientWidth,
      height = wrapperRef.current.clientHeight;
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

    const createNetwork = (edgeList) => {
      const nodeHash = {};
      const nodes = [];
      const edges = [];

      Array.prototype.forEach.call(edgeList, (edge) => {
        if (!nodeHash[edge._source.layers.ip["ip.src"]]) {
          nodeHash[edge._source.layers.ip["ip.src"]] = {
            id: edge._source.layers.ip["ip.src"],
            label: edge._source.layers.ip["ip.src"],
            weight: 1,
            fixed: false,
            tootltip: false,
            type: "node",
            edges: [edge],
            totalbytes: null,
            largestTran: null,
          };
          nodes.push(nodeHash[edge._source.layers.ip["ip.src"]]);
        } else {
          nodeHash[edge._source.layers.ip["ip.src"]].weight =
            nodeHash[edge._source.layers.ip["ip.src"]].weight + 1;
          nodeHash[edge._source.layers.ip["ip.src"]].edges.push(edge);
        }
        if (!nodeHash[edge._source.layers.ip["ip.dst"]]) {
          nodeHash[edge._source.layers.ip["ip.dst"]] = {
            id: edge._source.layers.ip["ip.dst"],
            label: edge._source.layers.ip["ip.dst"],
            weight: 1,
            type: "node",
            edges: [edge],
            tooltip: false,
            fixed: false,
            totalbytes: null,
            largestTran: null,
          };
          nodes.push(nodeHash[edge._source.layers.ip["ip.dst"]]);
        } else {
          nodeHash[edge._source.layers.ip["ip.dst"]].weight =
            nodeHash[edge._source.layers.ip["ip.dst"]].weight + 1;
          nodeHash[edge._source.layers.ip["ip.dst"]].edges.push(edge);
        }
        if (
          edges.findIndex(
            (element) =>
              element.name.includes(edge._source.layers.ip["ip.src"]) &&
              element.name.includes(edge._source.layers.ip["ip.dst"])
          ) === -1
        ) {
          edges.push({
            name:
              edge._source.layers.ip["ip.src"] +
              "_" +
              edge._source.layers.ip["ip.dst"],
            source: nodeHash[edge._source.layers.ip["ip.src"]],
            target: nodeHash[edge._source.layers.ip["ip.dst"]],
            type: "edge",
            tooltip: false,
            weight: 1,
            totalbytes: null,
            largestTran: null,
            totalcomm: null,
          });
        } else {
          edges[
            edges.findIndex(
              (element) =>
                element.name.includes(edge._source.layers.ip["ip.src"]) &&
                element.name.includes(edge._source.layers.ip["ip.dst"])
            )
          ].weight =
            edges[
              edges.findIndex(
                (element) =>
                  element.name.includes(edge._source.layers.ip["ip.src"]) &&
                  element.name.includes(edge._source.layers.ip["ip.dst"])
              )
            ].weight + 1;
        }
      });

      const min = nodes.reduce(function (prev, current) {
        return prev.weight < current.weight ? prev : current;
      });
      const max = Math.max.apply(
        Math,
        nodes.map(function (o) {
          return o.weight;
        })
      );

      const x = d3.scaleLog().domain([min.weight, max]).range([3, 20]);

      x.clamp(true);

      nodes.forEach(function (obj) {
        obj.totalcomm = obj.weight;
        obj.weight = x(obj.weight);
      });

      createForceNetwork(nodes, edges);
    };

    function createForceNetwork(nodes, edges) {
      const force = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink().links(edges))
        .force(
          "forceX",
          d3
            .forceX()
            .strength(0.1)
            .x(width * 0.5)
        )
        .force(
          "forceY",
          d3
            .forceY()
            .strength(0.1)
            .y(height * 0.5)
        )
        .force(
          "center",
          d3
            .forceCenter()
            .x(width * 0.5)
            .y(height * 0.5)
        )
        .force("charge", d3.forceManyBody().strength(-5000));

      force.on("tick", updateNetwork);

      svg
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .style("stroke-width", "1px")
        .style("stroke", "#456682")
        .on("mouseover", tooltiphere)
        .on("mouseout", tooltipbye);

      const nodeEnter = svg
        .selectAll("g.node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .on("click", nodeClick)
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      nodeEnter
        .append("circle")
        .attr("fill", "#9ED2FF")
        .attr("r", 5)
        .on("mouseover", tooltiphere)
        .on("mouseout", tooltipbye);

      nodeEnter
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", 2)
        .style("font-size", "12px")
        .text(function (d) {
          return d.id;
        })
        .style("pointer-events", "none");

      nodeEnter
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", 2)
        .style("font-size", "12px")
        .text(function (d) {
          return d.id;
        })
        .style("pointer-events", "none");

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
        setIPs(d.filtered_edges);
        tooltip.transition().duration(200).style("opacity", 1);

        tooltip
          .style("left", event.screenX  - 250 + "px")
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

      function dragstarted(event, d) {
        if (!event.active) force.alphaTarget(0.03).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) force.alphaTarget(0.03);
        d.fx = event.x;
        d.fy = event.y;
      }

      function nodeClick(event, d) {
        if (d.fixed) {
          d.fx = null;
          d.fy = null;
        } else {
          d.fixed = true;
          d.fx = d.x;
          d.fy = d.y;
        }
      }

      function updateNetwork() {
        svg
          .selectAll("line")
          .attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          })
          .style("stroke-width", function (d) {
            return d.weight + "" + "px";
          });

        svg.selectAll("g.node").attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

        svg.selectAll("g.node > circle").attr("r", function (d) {
          return d.weight * 4;
        });
      }
    }

    const data = require("./test.json");
    createNetwork(data);
  }, []);
  return (
    <div ref={wrapperRef} className="graph">
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef}></div>
    </div>
  );
};

export default HostComViz;
