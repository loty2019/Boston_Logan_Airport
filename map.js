document.addEventListener("DOMContentLoaded", function () {
  var svg = d3
    .select("div#chartId")
    .append("div")
     // Container class to make it responsive.
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 400")
    .attr("border", "1px solid black")
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

    var flights = [
      { source: [-71.0589, 42.3601], destination: [-0.1278, 51.5074] }, // Boston - London
      { source: [-71.0589, 42.3601], destination: [139.6917, 35.6895] }, // Boston - Tokyo
      { source: [-71.0589, 42.3601], destination: [-74.006, 40.7128] }, // Boston - New York
      { source: [-71.0589, 42.3601], destination: [-118.2437, 34.0522] }, // Boston - Los Angeles
      { source: [-71.0589, 42.3601], destination: [-87.6298, 41.8781] }, // Boston - Chicago
      { source: [-71.0589, 42.3601], destination: [-95.3698, 29.7604] }, // Boston - Houston
      { source: [-71.0589, 42.3601], destination: [-122.4194, 37.7749] }, // Boston - San Francisco
      { source: [-71.0589, 42.3601], destination: [-77.0369, 38.9072] }, // Boston - Washington
      { source: [-71.0589, 42.3601], destination: [-66.1057, 18.4655] }, // Boston - San Juan
      { source: [-71.0589, 42.3601], destination: [-58.3816, -34.6037] }, // Boston - Buenos Aires
      { source: [-71.0589, 42.3601], destination: [2.3522, 48.8566] }, // Boston - Paris
      { source: [-71.0589, 42.3601], destination: [114.1694, 22.3193] }, // Boston - Hong Kong
      { source: [-71.0589, 42.3601], destination: [77.1025, 28.7041] }, // Boston - New Delhi
      { source: [-71.0589, 42.3601], destination: [151.2093, -33.8688] }, // Boston - Sydney
      { source: [-71.0589, 42.3601], destination: [4.8055, 52.3667] }, // Boston - Amsterdam
      { source: [-71.0589, 42.3601], destination: [100.5167, 13.75] }, // Boston - Bangkok
      { source: [-71.0589, 42.3601], destination: [37.6176, 55.7558] }, // Boston - Moscow
      { source: [-71.0589, 42.3601], destination: [28.9784, 41.0082] }, // Boston - Istanbul
      { source: [-71.0589, 42.3601], destination: [30.5234, 50.4501] }, // Boston - Kiev
      { source: [-71.0589, 42.3601], destination: [139.638, 35.4437] }, // Boston - Yokohama
      { source: [-71.0589, 42.3601], destination: [121.5654, 25.033] }, // Boston - Taipei
      { source: [-71.0589, 42.3601], destination: [121.4737, 31.2304] }, // Boston - Shanghai
      { source: [-71.0589, 42.3601], destination: [114.1721, 22.3193] }, // Boston - Macau
      { source: [-71.0589, 42.3601], destination: [114.2024, 22.308] }, // Boston - Hong Kong
      { source: [-71.0589, 42.3601], destination: [114.1745, 22.2783] }, // Boston - Kowloon
      { source: [-71.0589, 42.3601], destination: [114.1772, 22.2988] }, // Boston - Tsuen Wan
      { source: [-71.0589, 42.3601], destination: [114.1712, 22.3193] }, // Boston - Tuen Mun
      { source: [-71.0589, 42.3601], destination: [114.1603, 22.2785] }, // Boston - Sha Tin
      { source: [-71.0589, 42.3601], destination: [114.1861, 22.2936] }, // Boston - Yuen Long
      { source: [-71.0589, 42.3601], destination: [114.1719, 22.307] }, // Boston - Kwai Chung
    ];

    svg
      .selectAll("myFlights")
      .data(flights)
      .enter()
      .append("path")
      .attr("d", function (d) {
        return path({
          type: "LineString",
          coordinates: [d.source, d.destination],
        });
      })
      .style("fill", "none")
      .style("stroke", "#FF5733")
      .style("stroke-width", 1);
  });
});
