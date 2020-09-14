
var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 450 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svgT = d3.select("#temperature")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var svgCO2 = d3.select("#co2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var svgH = d3.select("#humidity")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var svgPM2p5 = d3.select("#pm2p5")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var svgPM10 = d3.select("#pm10")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var format = d3.timeFormat("%a %b %e %Y %I:%M:%S %p (PST)");

//Read the data
d3.csv("/sensors.php?now=" + Date.now(),
  // When reading the csv, I must format variables:
  function(d){
    temp_pm2p5 = +d.pm2p5;
    temp_pm10 = +d.pm10;
    if(temp_pm2p5 > 500 || temp_pm2p5 < 0){ temp_pm2p5 = 0; }
    if(temp_pm10 > 500 || temp_pm10 < 0){ temp_pm10 = 0; }

    return {
      timestamp : d3.timeParse("%Y-%m-%d %H:%M:%S")(d.timestamp), 
      temperature : ((+d.temperature * 9) / 5) + 32,
      humidity : +d.humidity,
      pm2p5 : temp_pm2p5,
      pm10 : temp_pm10,
      co2 : +d.co2
    }
  },
  // Now I can use this dataset:
  function(data) {
    var latest_temp = data[0].temperature.toFixed(2);
    var latest_co2 = data[0].co2;
    var latest_hum = data[0].humidity.toFixed(2);
    var latest_pm2p5 = data[0].pm2p5.toFixed(1);
    var latest_pm10 = data[0].pm10.toFixed(1);
    var latest_timestamp = data[0].timestamp;

    var summary = "<h4><b>" + format(latest_timestamp) + "</b></h4>";

    if(latest_temp < 65){ summary += "<div class=\"alert alert-primary\">"; }
    else if(latest_temp > 85){ summary += "<div class=\"alert alert-danger\">"; }
    else if(latest_temp > 75){ summary += "<div class=\"alert alert-warning\">"; }
    else { summary += "<div class=\"alert alert-primary\">"; }
    summary += "Temperature : <b>" + latest_temp + "</b> (F)</div>";

    if(latest_co2 > 1500){ summary += "<div class=\"alert alert-danger\">"; }
    else if(latest_co2 > 850){ summary += "<div class=\"alert alert-warning\">"; }
    else { summary += "<div class=\"alert alert-primary\">"; }
    summary += "CO2 : <b>" + latest_co2 + "</b> (PPM)</div>";

    if(latest_hum < 20){ summary += "<div class=\"alert alert-danger\">"; }
    else if(latest_hum > 60){ summary += "<div class=\"alert alert-warning\">"; }
    else { summary += "<div class=\"alert alert-primary\">"; }
    summary += "Relative Humidity : <b>" + latest_hum + "</b> (%)</div>";

    if(latest_pm2p5 > 120){ summary += "<div class=\"alert alert-danger\">"; }
    else if(latest_pm2p5 > 60){ summary += "<div class=\"alert alert-warning\">"; }
    else { summary += "<div class=\"alert alert-primary\">"; }
    summary += "PM2.5 : <b>" + latest_pm2p5 + "</b> (PPM)</div>";

    if(latest_pm10 > 350){ summary += "<div class=\"alert alert-danger\">"; }
    else if(latest_pm10 > 100){ summary += "<div class=\"alert alert-warning\">"; }
    else { summary += "<div class=\"alert alert-primary\">"; }
    summary += "PM10 : <b>" + latest_pm10 + "</b> (PPM)</div>";

    $("#summary").append(summary);

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.timestamp; }))
      .range([ 0, width ]);
    svgT.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%I:%m")).ticks(10) )
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    svgCO2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%I:%m")).ticks(10) )
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    svgH.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%I:%m")).ticks(10) )
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    svgPM2p5.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%I:%m")).ticks(10) )
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    svgPM10.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%I:%m")).ticks(10) )
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // Get min/max
    var min_temp = Infinity; var max_temp = -Infinity;
    for(var i = 0; i < data.length; i++){
      if(data[i].temperature > max_temp){ max_temp = data[i].temperature; }
      if(data[i].temperature < min_temp){ min_temp = data[i].temperature; }
    }

    var min_co2 = Infinity; var max_co2 = -Infinity;
    for(var i = 0; i < data.length; i++){
      if(data[i].co2 > max_co2){ max_co2 = data[i].co2; }
      if(data[i].co2 < min_co2){ min_co2 = data[i].co2; }
    }

    var min_humi = Infinity; var max_humi = -Infinity;
    for(var i = 0; i < data.length; i++){
      if(data[i].humidity > max_humi){ max_humi = data[i].humidity; }
      if(data[i].humidity < min_humi){ min_humi = data[i].humidity; }
    }

    var min_pm2p5 = Infinity; var max_pm2p5 = -Infinity;
    for(var i = 0; i < data.length; i++){
      if(data[i].pm2p5 == 0){ continue; }
      if(data[i].pm2p5 > max_pm2p5){ max_pm2p5 = data[i].pm2p5; }
      if(data[i].pm2p5 < min_pm2p5){ min_pm2p5 = data[i].pm2p5; }
    }

    var min_pm10 = Infinity; var max_pm10 = -Infinity;
    for(var i = 0; i < data.length; i++){
      if(data[i].pm10 == 0){ continue; }
      if(data[i].pm10 > max_pm10){ max_pm10 = data[i].pm10; }
      if(data[i].pm10 < min_pm10){ min_pm10 = data[i].pm10; }
    }

    // Add Y axis
    var yT = d3.scaleLinear()
      .domain( [min_temp - 0.1, max_temp + 0.1])
      .range([ height, 0 ]);
    svgT.append("g")
      .call(d3.axisLeft(yT));
    // Add the line
    svgT.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0099c6")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.timestamp) })
        .y(function(d) { return yT(+d.temperature) })
        );
    // Add the points
    svgT
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.timestamp) } )
        .attr("cy", function(d) { return yT(+d.temperature) } )
        .attr("r", 1)
        .attr("fill", "#dd4477")
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", .9);
      div.html(
        d.timestamp + "<br>" + d.temperature + " (F)"
      )
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 15) + "px");
    })
    .on("mouseout", function (d) { div.transition().duration(500).style("opacity", 0); });

    // Add Y axis
    var yCO2 = d3.scaleLinear()
      .domain( [min_co2 - 0.1, max_co2 + 0.1])
      .range([ height, 0 ]);
    svgCO2.append("g")
      .call(d3.axisLeft(yCO2));
    // Add the line
    svgCO2.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0099c6")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.timestamp) })
        .y(function(d) { return yCO2(+d.co2) })
        );
    // Add the points
    svgCO2
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.timestamp) } )
        .attr("cy", function(d) { return yCO2(+d.co2) } )
        .attr("r", 1)
        .attr("fill", "#dd4477")
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", .9);
      div.html(
        d.timestamp + "<br>" + d.co2 + " (PPM)"
      )
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 15) + "px");
    })
    .on("mouseout", function (d) { div.transition().duration(500).style("opacity", 0); });


    var yH = d3.scaleLinear()
      .domain( [min_humi - 0.1, max_humi + 0.1])
      .range([ height, 0 ]);
    svgH.append("g")
      .call(d3.axisLeft(yH));
    // Add the line
    svgH.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0099c6")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.timestamp) })
        .y(function(d) { return yH(+d.humidity) })
        );
    // Add the points
    svgH
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.timestamp) } )
        .attr("cy", function(d) { return yH(+d.humidity) } )
        .attr("r", 1)
        .attr("fill", "#dd4477")
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", .9);
      div.html(
        d.timestamp + "<br>" + d.humidity + " (%)"
      )
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 15) + "px");
    })
    .on("mouseout", function (d) { div.transition().duration(500).style("opacity", 0); });



    var yPM2p5 = d3.scaleLinear()
      .domain( [min_pm2p5 - 0.1, max_pm2p5 + 0.1])
      .range([ height, 0 ]);
    svgPM2p5.append("g")
      .call(d3.axisLeft(yPM2p5));
    // Add the line
    svgPM2p5.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0099c6")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.timestamp) })
        .y(function(d) { return yPM2p5(+d.pm2p5) })
        );
    // Add the points
    svgPM2p5
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.timestamp) } )
        .attr("cy", function(d) { return yPM2p5(+d.pm2p5) } )
        .attr("r", 1)
        .attr("fill", "#dd4477")
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", .9);
      div.html(
        d.timestamp + "<br>" + d.pm2p5 + " (PPM)"
      )
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 15) + "px");
    })
    .on("mouseout", function (d) { div.transition().duration(500).style("opacity", 0); });


    var yPM10 = d3.scaleLinear()
      .domain( [min_pm10 - 0.1, max_pm10 + 0.1])
      .range([ height, 0 ]);
    svgPM10.append("g")
      .call(d3.axisLeft(yPM10));
    // Add the line
    svgPM10.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0099c6")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.timestamp); })
        .y(function(d) { return yPM10(+d.pm10); })
        );
    // Add the points
    svgPM10
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.timestamp); } )
        .attr("cy", function(d) { return yPM10(+d.pm10); } )
        .attr("r", 1)
        .attr("fill", "#dd4477")
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", .9);
      div.html(
        d.timestamp + "<br>" + d.pm10 + " (PPM)"
      )
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 15) + "px");
    })
    .on("mouseout", function (d) { div.transition().duration(500).style("opacity", 0); });


});
