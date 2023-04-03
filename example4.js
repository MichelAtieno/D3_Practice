function main() {
	var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;
    
    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Devin Booker Stats 2022-2023")

    var xScale = d3.scaleBand()
                   .range([0, width])
                   .padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");
    
    d3.csv("/data/dbook_log.csv").then(function(data) {
            console.log(data)
            xScale.domain(data.map(function(d){
                return d.GAME_DATE
                
            }))
            yScale.domain([0, d3.max(data, function(d) {
                // console.log(typeof(parseInt(d.PTS)))
                return d.PTS;
            })])

            g.append("g")
             .attr("transform", "translate(0,"+height+")")
             .call(d3.axisBottom(xScale))
             .selectAll("text")
             .style("text-anchor", "end")
             .attr("dx", "-.8em")
             .attr("dy", ".15em")
             .attr("stroke", "black")
             .attr("transform", "rotate(-50)")
            
            g.append("g")
             .call(d3.axisLeft(yScale).ticks(10))
             .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 10)
             .attr("dy", "-5em")
             .attr("text-anchor", "end")
             .attr("stroke", "black")
             .text("Dev Booker Pts 2022-2023 season");

            g.selectAll(".bar")
             .data(data)
             .enter().append("rect")
             .attr("class", "bar")
             .on("mouseover", onMouseOver)
             .on("mouseout", onMouseOut)
             .attr("x", function(d){
                return xScale(d.GAME_DATE);
             })
             .attr("y", function(d){
                return yScale(d.PTS);
             })
             .attr("width", xScale.bandwidth())
             .transition()
             .ease(d3.easeLinear)
             .duration(500)
             .delay(function(d, i) {
                return i * 50
             })
             .attr("height", function(d) {
                return height - yScale(d.PTS)
             });

            function onMouseOver(d, i) {
                var xPos = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2;
		        var yPos = parseFloat(d3.select(this).attr('y')) / 2 + height / 2

                d3.select("#tooltip")
                  .style("left", xPos + "px")
                  .style("top", yPos + "px")
                  .select("#value")
                  .text("Pts Scored: " + i.PTS )
                  .append("p")
                  .append("text")
                  .text("MatchUp: " + i.MATCHUP)
                  .append("p")
                  .append("text")
                  .text("Mins Played: " + i.MIN)
                  .append("p")
                  .append("text")
                  .text("Assists: " + i.AST)
                  .append("p")
                  .append("text")
                  .text("Rebounds: " + i.REB)

                d3.select("#tooltip")
                  .classed("hidden", false)


                d3.select(this).attr("class", "highlight")
                d3.select(this).transition()
                               .duration(500)
                               .attr("width", xScale.bandwidth() + 5)
                               .attr("y", function(d) {
                                return yScale(d.PTS) - 10;
                               })
                               .attr("height", function(d) {
                                return height - yScale(d.PTS) + 10;
                               });
             };

            function onMouseOut(d, i) {
                d3.select(this).attr("class", "bar")
                d3.select(this).transition()
                               .duration(500)
                               .attr("width", xScale.bandwidth())
                               .attr("y", function(d) {
                                return yScale(d.PTS);
                               })
                               .attr("height", function(d) {
                                return height - yScale(d.PTS);
                               });
                
                d3.select("#tooltip")
                  .classed("hidden", true)
             };


    });
}