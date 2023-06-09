var svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");

var graphData = {
    nodes: [
        { name: "A", radius: 10 },
        { name: "B", radius: 15 },
        { name: "C", radius: 50 }, 
        { name: "D", radius: 35 }
    ],
    links: [
        { source: "A", target: "B"},
        { source: "B", target: "C"},
        { source: "D", target: "C"},
    ]
};

var simulation = d3
    .forceSimulation(graphData.nodes)
    .force("charge", d3.forceManyBody().strength(300))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide(function(d) {
        return d.radius;
    }))
    .on("tick", ticked);

var links = svg
    .append("g")
    .selectAll("line")
    .data(graphData.links)
    .enter()
    .append("line")
    .attr("stroke-width", 3)
    .style("stroke", "orange");

var drag = d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

var textsAndNodes = svg
    .append("g")
    .selectAll("g")
    .data(graphData.nodes)
    .enter()
    .append("g")
    .call(drag); 

var circles = textsAndNodes
    .append("circle")
    .attr("r", function(d) {
        return d.radius
    })
    .attr("fill", "red");

var texts = textsAndNodes.append("text").text(function(d) {
    return d.name;
});

function ticked() {
    //translate(x, y)
    textsAndNodes.attr("transform", function(d) {
        return "translate(" + d.x + ", " + d.y + ")";
    });

    links
        .attr("x1", function(d){
            return d.source.x;
        })
        .attr("y1", function(d){
            return d.source.y;
        })
        .attr("x2", function(d){
            return d.target.x;
        })
        .attr("y2", function(d){
            return d.target.y;
        });
    console.log(simulation.alpha());  
}

function dragstarted(d) {
    //your alpha hit 0 it stops! make it run again
    simulation.alphaTarget(0.3).restart();
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    // alpha min is 0, head there
    simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

