var DEFAULT_COLOUR_MAP = 2;


function ColourMap(name, colourValues)
{
    this.name = name;
    this.colourValues = colourValues;
}


var COLOUR_MAPS = [
    new ColourMap("Bright Rainbow (8 colours)", ["#ff0000", "#ff6600", "#ffcc00", "#66ff33", "#00ff99", "#0099ff", "#0033cc", "#6600ff"]),
    new ColourMap("Muted Rainbow (7 colours)", ["#990033", "#ff3300", "#ff9900", "#006600", "#004466", "#002966", "#202060"]),
    new ColourMap("Red-White-Blue (12 colours)", ["#000066", "#3333ff", "#3366ff", "#6699ff", "#99ccff", "#ccccff", "#ffffff", "#ffcc99", "#ff9966", "#ff6600", "#ff0000", "#800000"])
];


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


function addColourMenu()
{
    let elem = document.getElementById("selectColours");
    let html = "<select id=\"colourDropdown\" onChange=\"redraw()\">";
    for (i = 0; i < COLOUR_MAPS.length; i++)
    {
        html += "<option value=\"" + i + "\""
        if (i == DEFAULT_COLOUR_MAP)
        {
            html += "selected=\"selected\"";
        }
        html += ">" + COLOUR_MAPS[i].name + "</option>";
    }
    html += "</select>";

    elem.innerHTML = html;
}


function ColourRangeFromStepSize(startingPoint, stepSize, colourMap)
{
    this.ranges = [startingPoint];
    let cur = startingPoint;
    for (i = 0; i < colourMap.colourValues.length-1; i++)
    {
        cur += stepSize;
        this.ranges.push(cur);
    }
    this.colours = colourMap.colourValues;
}


function ColourRangeFromTemperatures(temperatures, colourMap)
{
    let tmpSum = temperatures.reduce(function(a, b) { return a + b; });
    let avgTmp = tmpSum / temperatures.length;
    avgTmp = Math.round(avgTmp);

    let maxTmp = Math.max(...temperatures);
    let minTmp = Math.min(...temperatures);

    let rangeLength = maxTmp - minTmp;
    let stepSize = Math.round(rangeLength/colourMap.colourValues.length);
    let startingPoint = avgTmp - ((colourMap.colourValues.length / 2.0) * stepSize);

    this.ranges = [startingPoint];
    let cur = startingPoint;
    for (i = 0; i < colourMap.colourValues.length-1; i++)
    {
        cur += stepSize;
        this.ranges.push(cur);
    }
    this.colours = colourMap.colourValues;
}