var DEFAULT_COLOUR_MAP = 2;


function ColourMap(name, colourValues)
{
    this.name = name;
    this.colourValues = colourValues;
}


var COLOUR_MAPS = [
    new ColourMap("Bright Rainbow (8 colours)", ["#6600ff", "#0033cc", "#0099ff", "#00ff99", "#66ff33", "#ffcc00", "#ff6600", "#ff0000"]),
    new ColourMap("Muted Rainbow (7 colours)", ["#202060", "#002966", "#004466", "#006600", "#ff9900", "#ff3300", "#990033"]),
    new ColourMap("Red-White-Blue (12 colours)", ["#000066", "#3333ff", "#3366ff", "#6699ff", "#99ccff", "#ccccff", "#ffffff", "#ffcc99", "#ff9966", "#ff6600", "#ff0000", "#800000"])
];


function addColourRangeMenu()
{
    let elem = document.getElementById("selectRanges");

    let html = "<form id=\"colourRange\">";
    // Add radio buttons
    // Uniform ("select something that fits this city")
    html += "<label for=\"uniform\">Uniformly spaced temperatures</label><input type=\"radio\" name=\"rangeType\" id=\"uniform\" value=\"uniform\" checked />";
    // Similar amounts of each colour
    html += "<br />";
    html += "<label for=\"uniformByYarn\">Similar amount of each colour</label><input type=\"radio\" name=\"rangeType\" id=\"uniformByYarn\" value=\"uniformByYarn\" />";
    // Custom (user defines)
    html += "<br />";
    html += "<label for=\"customEvenSpaced\">Evenly spaced, custom range</label><input type=\"radio\" name=\"rangeType\" id=\"customEvenSpaced\" value=\"custom\" />";

    html += "<br />";
    html += "<label for=\"startingPoint\">Starting point</label><input type=\"number\" id=\"startingPoint\" name=\"startingPoint\" value=\"-20\" min=\"-100\" step=\"1\" />"
    html += "<br />";
    html += "<label for=\"stepSize\">Step length</label><input type=\"number\" id=\"stepSize\" name=\"stepSize\" value=\"10\" min=\"1\" step=\"1\" />"

    // TODO: add a way to adjust ranges unevenly (e.g. short ranges where most temperatures fall)

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


// Needs renaming ...
function FlexibleColourRangeFromTemperatures(temperatures, sortedTemperatures, colourMap)
{
    let days = temperatures.length;
    let colours = colourMap.colourValues.length;

    let daysPerColourOnAverage = days / colours;

    let startingPoint = sortedTemperatures[0];

    // It'd kind of be better to store a denser version of the sorted data ...
    // but that'd require changing the data structure. Think, "-2: 2, -1: 6, 0: 8, ..."
    // so maybe I'll change it later --lk 2/1/2018

    this.ranges = [startingPoint];

    // So the way this works is...
    // If we want to have 10 days in each colour bucket, and
    // we're currently packing stuff in the fifth bucket, we
    // are trying to have as close as we can to the number 50
    // in total in all previous buckets.
    // If a max temperature for the fifth bucket's range won't
    // have more than 50 things in the buckets in total (e.g.
    // there are 48 days in buckets so far), we will always set
    // at least that max temperature.
    // If we go over, then we'll compare. E.g. 48 is preferable
    // to 53.
    // Obviously this is never going to work if we have e.g. 30
    // days with the same temperature (then some bucket will have
    // to contain all 30 anyway). If the user doesn't like the
    // automated output, there will later be a custom function
    // where they can set any arbitrary ranges to make the blanket
    // look nice.

    let goal = daysPerColourOnAverage;
    let current = 0;
    let maxTemp = sortedTemperatures[0] - 1;
    // Find next max temp
    let ctr = 0;
    while (ctr < days)
    {
        if (sortedTemperatures[ctr] > maxTemp)
        {
            // If we are not at the goal yet, we will always raise maxTemp
            if (ctr <= goal)
            {
                // Check if I'm using maxTemp inclusive or exclusive?
                maxTemp = sortedTemperatures[ctr];
            }
            else
            {
                // Only raise maxTemp if it's closer to the goal
                if (Math.abs(goal - current) > Math.abs(goal - ctr))
                {
                    maxTemp = sortedTemperatures[ctr];
                }
                // One could get the median of the current temperature and the next one, but we
                // expect that the differences won't be too great so this is OK too (and simpler)
                this.ranges.push(maxTemp);
                // Raise goal, since we've moved to a different bucket now
                goal += daysPerColourOnAverage;
            }
            current = ctr;
        }
        ctr += 1;
    }
    this.ranges.push(sortedTemperatures[sortedTemperatures.length-1]+1);
    this.colours = colourMap.colourValues;
}