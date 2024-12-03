const ecar = d3.csv("Electric Vehicle Population Data.csv");

ecar.then(function(data) {
    data.forEach(function(d) {
        d.ModelYear = +d['Model Year'];
        d.ElectricRange = +d['Electric Range'];
    });

    // define the dimensions and margins for the SVG
    const margin = { top: 10, right: 150, bottom: 50, left: 50 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#scatterplot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.ModelYear))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.ElectricRange))
        .range([height, 0]);

    const colorScale = d3.scaleOrdinal()
        .domain([...new Set(data.map(d => d['Electric Vehicle Type']))])
        .range(d3.schemeCategory10);

    // Add circles for each data point
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => xScale(d.ModelYear))
        .attr("cy", d => yScale(d.ElectricRange))
        .attr("r", 3)
        .style("fill", d => colorScale(d['Electric Vehicle Type']));

    // Add X-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("x", width / 2)
        .attr("y", 35)
        .style("fill", "black")
        .style("text-anchor", "middle")
        .text("Model Year");

    // Add Y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -height / 2)
        .style("fill", "black")
        .style("text-anchor", "middle")
        .text("Electric Range");

    // Add legend
    const legend = svg.selectAll(".legend")
        .data(colorScale.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${width + 20}, ${i * 20})`);

    legend.append("circle")
        .attr("cx", 0)
        .attr("cy", 10)
        .attr("r", 6)
        .style("fill", d => colorScale(d));

    legend.append("text")
        .attr("x", 15)
        .attr("y", 15)
        .text(d => d);
    
    const tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "#f9f9f9")
    .style("border", "1px solid #ccc")
    .style("padding", "5px")
    .style("border-radius", "4px");

    svg.selectAll("circle")
    .on("mouseover", (event, d) => {
        tooltip.html(`Year: ${d.ModelYear}<br>Range: ${d.ElectricRange}`)
               .style("visibility", "visible")
               .style("top", `${event.pageY - 10}px`)
               .style("left", `${event.pageX + 10}px`);
    })
    .on("mousemove", event => {
        tooltip.style("top", `${event.pageY - 10}px`)
               .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => tooltip.style("visibility", "hidden"));

});
