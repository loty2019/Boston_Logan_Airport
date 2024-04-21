function domesticFlights(svg, path) {
  d3.json("/src/international_flights.json").then(function (data) {
    svg
      .selectAll("myFlights")
      .data(data.flights)
      .enter()
      .append("path")
      .attr("d", function (d) {
        return path({
          type: "LineString",
          coordinates: [d.source, d.destination],
        });
      })
      .attr("stroke-dasharray", function () {
        var totalLength = this.getTotalLength();
        return totalLength + " " + totalLength;
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength();
      })
      .style("fill", "none")
      .style("stroke", "#FF5733")
      .style("stroke-width", 1)
      .transition()
      .duration(3000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var svg = d3
    .select("div#chartId")
    .append("div")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 400")
    .classed("svg-content-responsive", true)
    .append("g");

  var projection = d3.geoMercator().translate([300, 200]).scale(100);
  var path = d3.geoPath().projection(projection);

  d3.json(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  ).then(function (dataGeo) {
    svg
      .append("g")
      .selectAll("path")
      .data(dataGeo.features)
      .enter()
      .append("path")
      .attr("fill", "#b8b8b8")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", 0.5);
  });

  // scroll magic

  var controller = new ScrollMagic.Controller();

  var scene = new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    duration: 600,
  })
    .setPin("#pin1")
    .addIndicators({ name: "1 (duration: 400)" })
    .addTo(controller);

  var scene2 = new ScrollMagic.Scene({
    triggerElement: "#trigger2",
    duration: 600,
  })
    .setPin("#pin2")
    .addIndicators({ name: "2 (duration: 400)" })
    .addTo(controller)
    .on("enter", function (event) {
      domesticFlights(svg, path);
    });

  var scene3 = new ScrollMagic.Scene({
    triggerElement: "#trigger3",
    duration: 600,
  })
    .setPin("#pin3")
    .addIndicators({ name: "3 (duration: 400)" })
    .addTo(controller);

  var scene4 = new ScrollMagic.Scene({
    triggerElement: "#trigger4",
    duration: 600,
  })
    .setPin("#pin4")
    .addIndicators({ name: "4 (duration: 400)" })
    .addTo(controller);
});
