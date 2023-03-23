var svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");

// Initialize data
var graph = {
    nodes: [
        { name: "Alice" },
        { name: "Bob" },
        { name: "Chen" },
        { name: "Dawg" },
        { name: "Ethan" },
        { name: "George" },
        { name: "Frank" },
        { name: "Hanes" },
    ],
    links: [
        { source: "Alice", target: "Bob"},
        { source: "Chen", target: "Bob"},
        { source: "Dawg", target: "Chen"},
        { source: "Hanes", target: "Frank"},
        { source: "Hanes", target: "George"},
        { source: "Dawg", target: "Ethan"},
    ]
};

var simulation = d3
    .forceSimulation(graph.nodes)
    .force(
        "link", 
        d3.forceLink(graph.links).id(function(d) {
            return d.name;
        })
    )
    .force("charge", d3.forceManyBody().strength(-30))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

var link = svg
    .append("g")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("stroke-width", function(d) {
        return 3;
    })
    .style("stroke", "pink");

var node = svg
    .append("g")
    .selectAll("circle")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", function(d) {
        return "orange";
    })
    .attr("stroke", "yellow");

function ticked() {
    link
        .attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.target.x;
        })
        .attr("y2", function(d) {
            return d.target.y;
        });
    
    node
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        });
}
        
