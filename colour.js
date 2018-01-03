/**
 * Create a ColourMap.
 *
 * @param name  Identifier for the dropdown, e.g. "Greens (9 colours)"
 * @param colourValues  Array of hex colours from COLD to HOT, e.g. ["#0000ff", "#ffffff", "#ff0000"].
 */
function ColourMap(name, colourValues)
{
    this.name = name;
    this.colourValues = colourValues;
}


/**
 * Create a ColourRange.
 *
 * @param cutPoints  Array of cutpoints (numbers representing degrees), from COLD to HOT.
 * The max temperature of the range is inclusive.
 * E.g. if the cutpoints are 0, 5 and 10, then the effective ranges will
 * be -Inf to 0; 1 to 5; 6 to 10; 11 to Inf.
 */
function ColourRange(cutPoints)
{
    this.cutPoints = [Number.NEGATIVE_INFINITY];
    this.cutPoints = this.cutPoints.concat(cutPoints, [Number.POSITIVE_INFINITY]);
}


/**
 * Get a hex colour value for a given temperature.
 *
 * @param temp  Temperature value.
 * @param colourMap  ColourMap object from which we take the values.
 * @param colourRange  ColourRange object from which we take the values.
 * @param lookup  Dictionary maintained by the caller that stores already resolved values
 * so we don't need to do a linear search for the range every time.
 * @param getByIndex  Instead of returning the hex string, return the index
 * on the ColourMap.
 */
function getColourValueForTemperature(temp, colourMap, colourRange, lookup, getByIndex)
{
    console.assert(
        colourMap.colourValues.length + 1 == colourRange.cutPoints.length,
        "Number of colours and max temperatures don't match!"
    );

    let value = lookup[temp];

    if (value != undefined)
    {
        return value;
    }

    for (let i = 1; i < colourRange.cutPoints.length; i++)
    {
        if (colourRange.cutPoints[i-1] < temp && colourRange.cutPoints[i] >= temp)
        {
            if (getByIndex)
            {
                lookup[temp] = i-1;
            }
            else
            {
                lookup[temp] = colourMap.colourValues[i-1];
            }
            return lookup[temp];
        }
    }
}


/* Predefined colour maps */

var DEFAULT_COLOUR_MAP = 2;

var COLOUR_MAPS = [
    new ColourMap("Bright Rainbow (8 colours)", ["#6600ff", "#0033cc", "#0099ff", "#00ff99", "#66ff33", "#ffcc00", "#ff6600", "#ff0000"]),
    new ColourMap("Muted Rainbow (7 colours)", ["#202060", "#002966", "#004466", "#006600", "#ff9900", "#ff3300", "#990033"]),
    new ColourMap("Red-White-Blue (12 colours)", ["#000066", "#3333ff", "#3366ff", "#6699ff", "#99ccff", "#ccccff", "#ffffff", "#ffcc99", "#ff9966", "#ff6600", "#ff0000", "#800000"])
];



function getCityFromSelection()
{
    let citySelector = document.getElementById("citySelector");
    let cityIndex = citySelector.options[citySelector.selectedIndex].value;
    return cities[cityIndex];
}


function getColourMapFromSelection()
{
    let colourSelector = document.getElementById("colourDropdown");
    let colourIndex = colourSelector.options[colourSelector.selectedIndex].value;
    return COLOUR_MAPS[colourIndex];
}


function getColourRangeFromSelection()
{
    let city = getCityFromSelection();
    let colourMap = getColourMapFromSelection();

    let colourRangeOptions = document.getElementsByName("rangeType");
    let colourRangeSelection = "";

    for (i = 0; i < colourRangeOptions.length; i++)
    {
        if (colourRangeOptions[i].checked)
        {
            colourRangeSelection = colourRangeOptions[i].value;
            break;
        }
    }

    if (colourRangeSelection == "uniform")
    {
        return createEvenlySpacedColourRangeFromTemperatures(city.sortedTemperatures, colourMap);
    }
    else if (colourRangeSelection == "uniformByYarn")
    {
        return createFlexibleWidthColourRangefromTemperatures(city.sortedTemperatures, colourMap);
    }
    else
    {
        let startingPoint = Number(document.getElementById("startingPoint").value);
        let stepSize = Number(document.getElementById("stepSize").value);
        return createColourRangeFromStepSize(startingPoint, stepSize, colourMap);
    }
}


function getColourRange()
{

    // Get city from dropdown
    let citySelector = document.getElementById("citySelector");
    let cityIndex = citySelector.options[citySelector.selectedIndex].value;
    let city = cities[cityIndex];

    // Get range
    let rangeForm = document.getElementById("colourRange");
    let rangeSelectionTypes = document.getElementsByName("rangeType");
    let selectionValue = "";
    for (i = 0; i < rangeSelectionTypes.length; i++)
    {
        if (rangeSelectionTypes[i].checked)
        {
            selectionValue = rangeSelectionTypes[i].value;
            break;
        }
    }

    let colourSelector = document.getElementById("colourDropdown");
    let colourIndex = colourSelector.options[colourSelector.selectedIndex].value;
    let colourMap = COLOUR_MAPS[colourIndex];

    let colourRange = null;
    if (selectionValue == "uniform")
    {
        colourRange = new ColourRangeFromTemperatures(city.temperatures, colourMap);
    }
    else if (selectionValue == "uniformByYarn")
    {
        colourRange = new FlexibleColourRangeFromTemperatures(city.temperatures, city.sortedTemperatures, colourMap);
    }
    else
    {
        let startingPoint = Number(document.getElementById("startingPoint").value);
        let stepSize = Number(document.getElementById("stepSize").value);
        colourRange = new ColourRangeFromStepSize(startingPoint, stepSize, colourMap);
    }
    return colourRange;
}


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


function getCurrentColourValues()
{
    let colourSelector = document.getElementById("colourDropdown");
    let colourIndex = colourSelector.options[colourSelector.selectedIndex].value;
    let colourMap = COLOUR_MAPS[colourIndex];
    return colourMap.colourValues;
}


function getCurrentColourCounts()
{
    let city = getCityFromSelection();
    let colourMap = getColourMapFromSelection();
    let colourRange = getColourRangeFromSelection();

    let colourCounts = Array(colourMap.colourValues.length).fill(0);

    let lookup = {};

    for (i = 0; i < city.temperatures.length; i++)
    {
        colourCounts[getColourValueForTemperature(city.temperatures[i], colourMap, colourRange, lookup, true)] += 1;
    }

    return colourCounts;
}


function redrawColourRatios()
{
    let elem = document.getElementById("colourRatios");
    let html = "<p>";

    let colourValues = getCurrentColourValues();
    let colourCounts = getCurrentColourCounts();

    for (i = 0; i < colourValues.length; i++)
    {
        if (i != 0)
        {
            html += " ";
        }
        html += "<span style=\"border: 10px solid " + colourValues[i] + ";\">" + colourCounts[i] + "</span>";
    }

    html += "</p>";

    elem.innerHTML = html;

}


/* Methods to initialize colour ranges */


/**
 * Create ColourRange with evenly spaced "buckets".
 *
 * @param startingPoint  Number. The lower limit for the lowest bucket,
 * although this will later be converted to -Inf to cover any low values.
 * @param stepSize  Number. E.g. if the starting point is -13 and the step
 * size is 4, we will get a range like [-Inf, -9, -5, -1, 3, ...].
 * @param colourMap  Just used to get the number of buckets from
 * colourmap.colourValues.length.
 */
function createColourRangeFromStepSize(startingPoint, stepSize, colourMap)
{
    this.cutPoints = [];

    let temperature = startingPoint;
    for (i = 0; i < colourMap.colourValues.length - 1; i++)
    {
        temperature += stepSize;
        this.cutPoints.push(temperature);
    }

    return new ColourRange(cutPoints);
}


/**
 * Automatically find a startingPoint and stepSize for a ColourRange.
 *
 * @param sortedTemperatures  Array of sorted temperatures the ColourRange
 * is based on.
 * @param colourMap  ColourMap, just used to determine the number of
 * colours.
 */
function createEvenlySpacedColourRangeFromTemperatures(sortedTemperatures, colourMap)
{
    // Find mean
    let sumOfTemperatures = sortedTemperatures.reduce(function(a, b) { return a + b; });
    let avgTemp = sumOfTemperatures / sortedTemperatures.length;

    // Work out startingPoint and stepSize
    let maxTemp = sortedTemperatures[sortedTemperatures.length - 1];
    let minTemp = sortedTemperatures[0];

    let rangeLength = maxTemp - minTemp;
    let numColours = colourMap.colourValues.length;
    // The step size is rounded, so the range will probably be somewhat longer
    // or shorter than it "should be". To counteract this, we will centre the
    // range instead of just setting minTemp as startingPoint.
    let stepSize = Math.round(rangeLength / numColours);
    let effectiveRangeLength = stepSize * numColours;
    let startingPoint = Math.round(avgTemp - 0.5 * effectiveRangeLength);

    return createColourRangeFromStepSize(startingPoint, stepSize, colourMap);
}


/**
 * Attempt to create a ColourRange where not all buckets have the same width,
 * allowing us to have "approximately equal amounts" of each colour.
 *
 * @param sortedTemperatures  Sorted temperatures for which we initialize the
 * range
 * @param colourMap  ColourMap object, just used to get the number of colours.
 */
function createFlexibleWidthColourRangefromTemperatures(sortedTemperatures, colourMap)
{

    let cutPoints = [];

    let numColours = colourMap.colourValues.length;
    let numDays = sortedTemperatures.length;

    let daysPerColourOnAverage = numDays / numColours;

    // By the time we have filled the first bucket, we would
    // like there to be this many days in the bucket.
    let bucketNumber = 1;
    let currentCount = 0;

    let maxTemp = Number.NEGATIVE_INFINITY;

    let runner = 0;
    while (bucketNumber < numColours && runner < numDays - 1)
    {
        console.log(bucketNumber + ", " + runner);
        // Run to the end of the streak of one value
        while (sortedTemperatures[runner] == sortedTemperatures[runner+1])
        {
            runner += 1;
            if (runner == numDays - 1) break;
        }

        if (runner < bucketNumber * daysPerColourOnAverage)
        {
            // Always add this streak if we're not at the target yet
            // Max temp is inclusive, so we would make this the new max temp.
            maxTemp = sortedTemperatures[runner];
            currentCount = runner + 1;
        }
        else
        {
            // If we're over, we will only move the max temp if it
            // would bring us closer to the target
            let targetCount = bucketNumber * daysPerColourOnAverage;
            if (Math.abs(targetCount - currentCount) > Math.abs(targetCount - runner + 1))
            {
                maxTemp = sortedTemperatures[runner];
                currentCount = runner + 1;
            }
            // In either case, move to the next colour bucket
            cutPoints.push(maxTemp);
            bucketNumber += 1;
        }
        runner += 1;
    }

    // If we had an awful distribution and didn't get enough buckets, still
    // arbitrarily add some cutpoints so there is the right number
    while (cutPoints.length < numColours - 1)
    {
        // Always one degree higher ... they'll show in the visualizations
        cutPoints.push(cutPoints[cutPoints.length-1] + 1);
    }

    return new ColourRange(cutPoints);
}
