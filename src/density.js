document.addEventListener("DOMContentLoaded", function () {
  var width = 1900;
  var height = 1700;

  // Select the container and append an SVG element to it
  var svg = d3
    .select("div#countryChart")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1900 1200")
    .classed("svg-container-world", true)
    .append("g");

  // Projection and path setup
  var projection = d3
    .geoMercator()
    .scale(300) // Adjusted scale to better fit your viewBox
    .translate([width / 2, height / 2]); // Adjust to use local width and height
  var path = d3.geoPath().projection(projection);

  // Load and display GeoJSON
  d3.json("https://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .then(function (world) {
      console.log("GeoJSON loaded successfully");

      // Add paths for each country
      var countries = svg
        .selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("fill", "#b1b6bd")
        .attr("d", path)
        .attr("stroke", "grey")
        .attr("stroke-width", 0.5);

      // Data array
      d3.json("src/visitorsPerCountry.json").then(function (data) {
        var dataByCountryID = {};
        data.forEach(function (d) {
          dataByCountryID[d.country] = +d.count;
        });
        console.log("Data loaded successfully:", dataByCountryID);

        // Color scale
        var colorScale = d3
          .scaleThreshold()
          .domain([0, 5000, 10000, 20000, 50000, 100000, 200000])
          .range(d3.schemeBlues[8]);

        // Apply color scale to countries
        countries.attr("fill", function (d) {
          if (d.properties.name === "USA") {
            return "#d3d3d3";
          } else {
            if (dataByCountryID[d.properties.name]) {
              return colorScale(dataByCountryID[d.properties.name]);
            } else {
              return "#f3f4f6";
            }
          }
        });

        // Add legend
        var legend = svg
          .append("g")
          .attr("class", "legend")
          .attr("transform", "translate(50, 50)");

        var legendData = [
          { color: d3.schemeBlues[8][1], label: "0 - 5,000" },
          { color: d3.schemeBlues[8][2], label: "5,001 - 10,000" },
          { color: d3.schemeBlues[8][3], label: "10,001 - 20,000" },
          { color: d3.schemeBlues[8][4], label: "20,001 - 50,000" },
          { color: d3.schemeBlues[8][5], label: "50,001 - 100,000" },
          { color: d3.schemeBlues[8][6], label: "100,001 - 200,000" },
          { color: d3.schemeBlues[8][7], label: "200,001+" },
        ];

        legendData.forEach(function (d, i) {
          var legendRow = legend
            .append("g")
            .attr("transform", "translate(0," + i * 30 + ")");

          legendRow
            .append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", d.color);

          legendRow.append("text").attr("x", 30).attr("y", 15).text(d.label);
        });

        // Add legend title
        svg
          .append("text")
          .attr("x", 50)
          .attr("y", 30)
          .attr("class", "legend")
          .text("Visitors per Country");
      });
    })
    .catch(function (error) {
      console.error("Error loading the GeoJSON:", error);
    });
});
