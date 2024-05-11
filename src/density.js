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
    .append("g")

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
        .attr("d", path)
        .attr("fill", "grey")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5);

      // Data array
      var data = [
        { country: "United Kingdom", count: 865698 },
        { country: "France", count: 425687 },
        { country: "Republic of Ireland", count: 390163 },
        { country: "Netherlands", count: 387709 },
        { country: "Iceland", count: 295814 },
        { country: "Portugal", count: 251946 },
        { country: "Aruba", count: 247091 },
        { country: "Switzerland", count: 244714 },
        { country: "Canada", count: 384427 },
        { country: "Germany", count: 426349 },
        { country: "Italy", count: 227085 },
        { country: "United Arab Emirates", count: 215120 },
        { country: "Mexico", count: 199734 },
        { country: "Qatar", count: 172434 },
        { country: "Dominican Republic", count: 295754 },
        { country: "Turkey", count: 161337 },
        { country: "Spain", count: 159781 },
      ];

      var dataByCountryID = {};
      data.forEach(function (d) {
        dataByCountryID[d.country] = +d.count;
      });

      // Color scale
      var colorScale = d3
        .scaleThreshold()
        .domain([0, 50000, 100000, 200000])
        .range(d3.schemeBlues[5]);

      // Apply color scale to countries
      countries.attr("fill", function (d) {
        return colorScale(dataByCountryID[d.properties.name] || 0);
      });
    })
    .catch(function (error) {
      console.error("Error loading the GeoJSON:", error);
    });
});
