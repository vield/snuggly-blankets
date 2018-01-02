var COLOURS = ["#000066", "#3333ff", "#3366ff", "#6699ff", "#99ccff", "#ccccff", "#ffffff", "#ffcc99", "#ff9966", "#ff6600", "#ff0000", "#800000"];


function addColourRangeMenu()
{
    let elem = document.getElementById("selectRanges");

    let html = "<form id=\"colourRange\">";
    // Add radio buttons
    // Uniform ("select something that fits this city")
    html += "<input type=\"radio\" name=\"rangeType\" value=\"uniform\" checked>Uniform</input>";
    // Custom (user defines)
    html += "<input type=\"radio\" name=\"rangeType\" value=\"custom\">Custom</input>";

    html += "<br />";
    html += "<label for=\"startingPoint\">Starting point</label><input type=\"number\" id=\"startingPoint\" name=\"startingPoint\" value=\"-20\" min=\"-100\" step=\"1\" />"
    html += "<br />";
    html += "<label for=\"stepSize\">Step length</label><input type=\"number\" id=\"stepSize\" name=\"stepSize\" value=\"10\" min=\"1\" step=\"1\" />"

    html += "</form>";

    elem.addEventListener("change", redraw)
    elem.innerHTML = html;
}


function ColourRangeFromStepSize(startingPoint, stepSize)
{
    this.ranges = [startingPoint];
    let cur = startingPoint;
    for (i = 0; i < COLOURS.length-1; i++)
    {
        cur += stepSize;
        this.ranges.push(cur);
    }
    this.colours = COLOURS;
}


function ColourRangeFromTemperatures(temperatures)
{
    let tmpSum = temperatures.reduce(function(a, b) { return a + b; });
    let avgTmp = tmpSum / temperatures.length;
    avgTmp = Math.round(avgTmp);

    let maxTmp = Math.max(...temperatures);
    let minTmp = Math.min(...temperatures);

    let rangeLength = maxTmp - minTmp;
    let stepSize = Math.round(rangeLength/COLOURS.length);
    let startingPoint = avgTmp - ((COLOURS.length / 2.0) * stepSize);

    this.ranges = [startingPoint];
    let cur = startingPoint;
    for (i = 0; i < COLOURS.length-1; i++)
    {
        cur += stepSize;
        this.ranges.push(cur);
    }
    this.colours = COLOURS;
}