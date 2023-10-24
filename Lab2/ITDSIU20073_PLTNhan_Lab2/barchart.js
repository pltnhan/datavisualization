// Generate an array of size 20 with random values
var dataset = Array.from({ length: 20 }, function() {
    return Math.floor(Math.random() * 100);
  });

  // Define the dimensions of the chart
  var width = 500;
  var height = 300;
  var padding = 0;

  // Create the SVG element
  var svg = d3.select("#chart")
    .append(svg)
    .attr("width", width)
    .attr("height", height);

  // Create the scales for x and y axes
  var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([padding, width - padding])
    .paddingInner(0.1);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - padding, padding]);

  // Create the bars
  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr("y", function(d) {
      return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
      return height - padding - yScale(d);
    })
    .attr("fill", function(d) {
      // Color the bars based on the value
      return "rgb(0, 0, " + Math.round(d * 2) + ")";
    });

  // Add value labels
  svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("x", function(d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
      return yScale(d) + 15;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");