document.addEventListener("DOMContentLoaded", function () {
  const data = [
    { airport: "JFK", length: 4000 },
    { airport: "LAX", length: 3700 },
    { airport: "MIA", length: 3200 },
    { airport: "ORD", length: 3900 },
  ];

  const svg = d3
    .select("#runwayChart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .classed("svg-content-responsive", true);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = parseInt(svg.style("width")) - margin.left - margin.right,
    height = parseInt(svg.style("height")) - margin.top - margin.bottom;

  
});
