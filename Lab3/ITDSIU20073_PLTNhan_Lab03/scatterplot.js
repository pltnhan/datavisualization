var rowConverter = function(d) {
    return {
        
        population : parseFloat (d.population),
        area : parseFloat(d.area),
        density : parseFloat(d.density),
        GRDP : parseFloat(d["GRDP-VND"])
    };
  
}

var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatterplot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://tungth.github.io/data/vn-provinces-data.csv", rowConverter)
.then(data => {
    console.log(data);
    draw_scatterplot(data);
})
function draw_scatterplot(data) {

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.population; })])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.GRDP; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    var rScale= d3.scaleLinear()
        .domain ([ d3.min(data, function (d) {return d.area}), d3.max(data, function (d) {return d.area})])
        .range([3,5])

    // name of X-axis :
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width-250)
        .attr("y", height + margin.top + 20)
       .text(" POPULATION")
        .attr("fill","red");
          

    // name of Y-axis :
    svg.append("text")
        .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
       .attr("y", -margin.left+20)
            .attr("x", -margin.top-80)
            .text("GRDP-VND")
            .attr("fill","red");

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.population); } )
        .attr("cy", function (d) { return y(d.GRDP); } )
        .attr("r", function (d) {return rScale(d.area);})
        .style("fill", "#69b3a2")
    
    // color  based on density
    .style("fill", function(d, i ) { return colorScale(d.density); })

    svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d){
        return d.area;
    })
    .attr("x", function(d){
        return Scalepopulation(d.population);
    })
    .attr("y", function(d){
    return ScaleGRDP(d.GRDP);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "7px") 
    .attr("fill","blue")

    console.log(data.length)

}
