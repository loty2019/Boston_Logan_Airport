document.addEventListener("DOMContentLoaded", function () {
  // Define the margins and dimensions of the chart area within the SVG
  var margin = { top: 20, right: 20, bottom: 40, left: 150 };
  var width = 1800 - margin.left - margin.right;
  var height = 1550 - margin.top - margin.bottom;

  // Select the div with id "runwayChart" and append an SVG element to it
  var svg = d3
    .select("div#runwayChart")
    .append("svg")
    .attr("viewBox", "0 0 1700 1650")
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Define the data for the chart
  var data = [
    { width: 12.8, img: "img/carrying-suitcase.svg", name: "1. LAS" },
    { width: 11.7, img: "img/carrying-suitcase.svg", name: "2. DEN" },
    { width: 7.4, img: "img/carrying-suitcase.svg", name: "3. SLC" },
    { width: 6.8, img: "img/carrying-suitcase.svg", name: "4. ATL" },
    { width: 5.3, img: "img/carrying-suitcase.svg", name: "5. PHX" },
    { width: 5.1, img: "img/carrying-suitcase.svg", name: "6. MSP" },
    { width: 4.7, img: "img/carrying-suitcase.svg", name: "7. SEA" },
    { width: 4.3, img: "img/carrying-suitcase.svg", name: "8. ORD" },
    { width: 3.9, img: "img/carrying-suitcase.svg", name: "9. CLT" },
    { width: 3.7, img: "img/carrying-suitcase-red.svg", name: "10. BOS" },
    { width: 3.4, img: "img/carrying-suitcase.svg", name: "11. EWR" },
    { width: 2.9, img: "img/carrying-suitcase.svg", name: "12. DTW" },
    { width: 2.9, img: "img/carrying-suitcase.svg", name: "13. DFW" },
    { width: 2.0, img: "img/carrying-suitcase.svg", name: "13. DFW" },
    { width: 2.0, img: "img/carrying-suitcase.svg", name: "14. MCO" },
    { width: 1.6, img: "img/carrying-suitcase.svg", name: "15. MIA" },
  ];
  
  // Define the x and y scales
  var x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.width)])
    .range([0, width]);

  var y = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, height])
    .padding(0.3);

  var imageWidth = 75; // Width of each image

  // Append images to the SVG element
  data.forEach(function (d) {
    var numImages = Math.floor(x(d.width) / imageWidth);

    for (var i = 0; i < numImages; i++) {
      var image = svg
        .append("image")
        .attr("xlink:href", d.img)
        .attr("x", i * imageWidth)
        .attr("y", y(d.name))
        .attr("width", imageWidth)
        .attr("height", y.bandwidth())
        .attr("preserveAspectRatio", "none")
        .attr("opacity", 0)  // Start fully transparent
        .transition()  // Begin a transition
        .duration(1050)  // Duration of 750ms
        .delay(i * 50)  // Delay each successive image slightly for a staggered effect
        .attr("opacity", 1);  // Fade to fully opaque
    }
  });
  // Append text labels to the SVG element
  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", -130)
    .attr("y", (d) => y(d.name) + 50)
    .text((d) => d.name)
    .attr("alignment-baseline", "middle")
    .style("font-size", "30px")
    .style("font-weight", "bold")
    .attr("text-anchor", "start");

  // Add x-axis to the chart
  var xAxis = d3.axisBottom(x).ticks(5);
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .style("font-size", "30px");

  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 45) + ")"
    )
    .style("text-anchor", "middle")
    .style("font-size", "30px")
    .style("font-weight", "bold")
    .text("Ratio (passenger/state residents)");
});