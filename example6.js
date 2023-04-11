function main() {
    
    var data = [2, 4, 8, 10, 14, 20];
    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width,  height) / 2;
         
    var g = svg.append("g")
               .attr("transform", "translate("+ width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(["#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#e40303", "#ffed00"]);
    var pie = d3.pie();
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);
    var arcs = g.selectAll("arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc")
    
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i)
        })
        .attr("d", arc);

    
}