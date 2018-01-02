var myCanvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


var COLOURS = ["#000066", "#3333ff", "#3366ff", "#6699ff", "#99ccff", "#ccccff", "#ffffff", "#ffcc99", "#ff9966", "#ff6600", "#ff0000", "#800000"];

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
    let startingPoint = avgTmp - (length / 2) * stepSize;

    this.ranges = [startingPoint];
    let cur = startingPoint;
    for (i = 0; i < COLOURS.length-1; i++)
    {
        cur += stepSize;
        this.ranges.push(cur);
    }
    this.colours = COLOURS;
}


function drawTemperatureBlanket(city, colourRange)
{
    context.beginPath();
    context.rect(0, 0, 600, 730);
    context.fillStyle = "white";
    context.fill();

    for (i = 0; i < 365; i++)
    {
        // x, y, width, height
        context.beginPath();
        context.rect(0, i*2, 600, 2);
        context.fillStyle = colourRange.colours[0];
        for (j = 0; j < colourRange.ranges.length; j++)
        {
            if (city.temperatures[i] > colourRange.ranges[j])
            {
                context.fillStyle = colourRange.colours[j];
            }
        }
        context.fill();
    }
}


function redraw()
{
    // Get city from dropdown
    let citySelector = document.getElementById("citySelector");
    let cityIndex = citySelector.options[citySelector.selectedIndex].value;
    let city = cities[cityIndex];
    // Default, FIXME
    let colourRange = new ColourRangeFromStepSize(-10, 3);

    drawTemperatureBlanket(city, colourRange);
}

addCityDropDownMenu();
drawTemperatureBlanket(cities[DEFAULT_CITY], new ColourRangeFromStepSize(-10, 3));