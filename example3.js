function main() {
    var width = 400, height = 100;
    var data = [10, 15, 20, 25, 30];

    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    var xScale = d3.scaleLinear()
                  .domain([d3.min(data), d3.max(data)])
                  .range([0, width - 100]);

    var xAxis = d3.axisBottom()
                  .scale(xScale);
    
    svg.append("g")
        .call(xAxis)

    var width = 400, height = 400;
    var data = [10, 15, 20, 25, 30];
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
    
    var yScale = d3.scaleLinear()
                    .domain([d3.min(data), d3.max(data)])
                    .range([height/2, 0]);

    var yAxis = d3.axisLeft()
                  .scale(yScale)
    
    svg.append("g")
       .attr("transform", "translate(50, 10)")
       .call(yAxis)

    var width = 500, height = 500;
    var data = [10, 15, 20, 25, 30];
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
    var xScale = d3.scaleLinear()
                   .domain([0, d3.max(data)])
                   .range([0, width - 100]);
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data)])
                   .range([height/2, 0]);
    var yAxis = d3.axisLeft()
                  .scale(yScale)
    var xAxis = d3.axisBottom()
                  .scale(xScale);
    svg.append("g")
       .attr("transform", "translate(50, 10)")
       .call(yAxis)

    var xAxisTranslate = height / 2 + 10;
    svg.append("g")
       .attr("transform", "translate(50," + xAxisTranslate + ")")
       .call(xAxis)
} 