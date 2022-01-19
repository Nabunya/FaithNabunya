/**
 * 
 * @param {{color:string;target:string,url:string}} party 
 */
function drawScatter(party) {

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#"+party.target)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //Read the data
    d3.csv("./data/pres_parl/"+party.url+".csv").then(function (data) {
        // Add X axis
        const x = d3.scaleLinear()
            .domain([d3.min(data,d=>parseInt(d.parliamentary)), d3.max(data,d=>parseInt(d.parliamentary))])
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([d3.min(data,d=>parseInt(d.presidential)),d3.max(data,d=>parseInt(d.presidential))])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .join("circle")
            .attr("cx", function (d) { return x(parseInt(d.parliamentary)); })
            .attr("cy", function (d) { return y(parseInt(d.presidential)); })
            .attr("r", 1.5)
            .style("fill", party.color)

    })
}