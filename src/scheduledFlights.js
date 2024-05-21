document.addEventListener("DOMContentLoaded", function () {
  // Define the margins and dimensions of the chart area within the SVG
  var margin = { top: 20, right: 20, bottom: 40, left: 50 };
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  // Select the div with id "scheduledFlightsChart" and append an SVG element to it
  var svg = d3
    .select("div#scheduledFlightsChart")
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`
    )
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Data for the chart
  var data = [
    { date: new Date("2024-04-20"), flights: 556 },
    { date: new Date("2024-04-21"), flights: 589 },
    { date: new Date("2024-04-22"), flights: 626 },
    { date: new Date("2024-04-23"), flights: 604 },
    { date: new Date("2024-04-24"), flights: 621 },
    { date: new Date("2024-04-25"), flights: 648 },
    { date: new Date("2024-04-26"), flights: 668 },
    { date: new Date("2024-04-27"), flights: 537 },
    { date: new Date("2024-04-28"), flights: 606 },
    { date: new Date("2024-04-29"), flights: 644 },
    { date: new Date("2024-04-30"), flights: 614 },
    { date: new Date("2024-05-01"), flights: 635 },
    { date: new Date("2024-05-02"), flights: 652 },
    { date: new Date("2024-05-03"), flights: 663 },
    { date: new Date("2024-05-04"), flights: 561 },
    { date: new Date("2024-05-05"), flights: 598 },
    { date: new Date("2024-05-06"), flights: 637 },
    { date: new Date("2024-05-07"), flights: 649 },
    { date: new Date("2024-05-08"), flights: 627 },
    { date: new Date("2024-05-09"), flights: 660 },
    { date: new Date("2024-05-10"), flights: 661 },
    { date: new Date("2024-05-11"), flights: 565 },
    { date: new Date("2024-05-12"), flights: 593 },
    { date: new Date("2024-05-13"), flights: 653 },
    { date: new Date("2024-05-14"), flights: 630 },
    { date: new Date("2024-05-15"), flights: 648 },
    { date: new Date("2024-05-16"), flights: 678 },
    { date: new Date("2024-05-17"), flights: 671 },
    { date: new Date("2024-05-18"), flights: 565 },
    { date: new Date("2024-05-19"), flights: 635 },
  ];

  // Define the x and y scales
  var x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, width]);
  var y = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => d.flights) - 50,
      d3.max(data, (d) => d.flights) + 50,
    ])
    .range([height, 0]);

  // Define the line generator
  var line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.flights));

  // Append the line path to the SVG element
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Add x-axis to the chart
  var xAxis = d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat("%m/%d"));
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .style("font-size", "14px");

  // Add y-axis to the chart
  var yAxis = d3.axisLeft(y);
  svg.append("g").call(yAxis).style("font-size", "14px");

  // Add labels to the axes
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")"
    )
    .style("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Date");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Scheduled Flights");
});
