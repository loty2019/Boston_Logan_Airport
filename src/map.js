function flightsRoute(svg, path, projection, whereTo) {
  console.log(whereTo);
  d3.json("src/" + whereTo).then(function (data) {
    svg.selectAll("path.flight-path").remove();
    svg.selectAll("circle").remove(); // Clear existing circles

    svg
      .selectAll("myFlights")
      .data(data.flights)
      .enter()
      .append("path")
      .classed("flight-path", true)
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
      .style("stroke", "#335abd")
      .style("stroke-width", 0.8)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    svg
      .selectAll("myCircles")
      .data(data.flights)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return projection([d.destination[0], d.destination[1]])[0];
      })
      .attr("cy", function (d) {
        return projection([d.destination[0], d.destination[1]])[1];
      })
      .attr("r", 2)
      .style("fill", "#6e8ee0")
      .attr("stroke", "#6e8ee0")
      .attr("stroke-width", 1)
      .attr("fill-opacity", 0.8);
  });
}

function zoomToUS(projection, path, svg) {
  projection
    .scale(300) 
    .translate([850, 400]); 

  svg.selectAll("path").transition().duration(1000).attr("d", path);
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
      .attr("fill", "#b1b6bd")
      .attr("d", path)
      .style("stroke", "#696969")
      .style("stroke-width", 0.5);

    // scroll magic setup
    var controller = new ScrollMagic.Controller();

    // Set up scenes for different flight data visualizations
    var scene1 = new ScrollMagic.Scene({
      triggerElement: "#trigger1",
      duration: 2000,
    })
      .setPin("#pin1")
      .addTo(controller)
      .on("enter", function () {
        projection.scale(100).translate([300, 200]);
        svg.selectAll("path").transition().duration(1000).attr("d", path);
        setTimeout(function () {
          projection.scale(100).translate([300, 200]);
           flightsRoute(svg, path, projection, "all_flights.json");
        }, 1000);
      });

    var scene2 = new ScrollMagic.Scene({
      triggerElement: "#trigger2",
      duration: 2000,
    })
      .setPin("#pin2")
      .addTo(controller)
      .on("enter", function () {
        zoomToUS(projection, path, svg);
        setTimeout(function () {
          flightsRoute(svg, path, projection, "domestic_flights.json");
        }, 1000);
      });

    var scene3 = new ScrollMagic.Scene({
      triggerElement: "#trigger3",
      duration: 2000,
    })
      .setPin("#pin3")
      .addTo(controller)
      .on("enter", function () {
        projection.scale(100).translate([300, 200]); // Reset to world view
        svg.selectAll("path").transition().duration(1000).attr("d", path);

        setTimeout(function () {
          projection.scale(100).translate([300, 200]);
          flightsRoute(svg, path, projection, "international_flights.json");
        }, 1000);

      });

    var scene4 = new ScrollMagic.Scene({
      triggerElement: "#trigger4",
      duration: 2000,
    })
      .setPin("#pin4")
      .addTo(controller);
  });
});
