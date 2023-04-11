function main() {
    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width,  height) / 2;

        var g = svg.append("g")
                   .attr("transform", "translate("+ width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(["#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#e40303", "#ffed00"]);
        var pie = d3.pie().value(function(d) {
            return d.PTS
        });
        var path = d3.arc()
                     .innerRadius(100)
                    //  .innerRadius(0)
                     .outerRadius(radius - 40);
        var label = d3.arc()
                      .innerRadius(radius - 100)
                     .outerRadius(radius);
        
        d3.csv("../data/first_10_log.csv")
          .then(
            function(data) {
                var arc = g.selectAll(".arc")
                       .data(pie(data))
                       .enter().append("g")
                       .attr("class", "arc");

                arc.append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    return color(d.data.GAME_DATE)
                });
                
                arc.append("text")
                .attr("transform", function(d) {
                        return 'translate(' + label.centroid(d) + ')';
                })
                .text(function(d) {
                    return d.data.GAME_DATE
                });
                
                svg.append("g")
                .attr("transform", "translate("+ (width / 2 - 120) + "," + 20 + ")")
                .append("text")
                .text("Last 10 games Dev Booker stats")
                .attr("class", "title");
        });

}