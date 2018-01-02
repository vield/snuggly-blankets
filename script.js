var myCanvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Some sample cities with different climates
// In the future, there will be a way to input your own temperatures but not sure yet how to add that

function City(name, temperatures)
{
    this.name = name;
    this.temperatures = temperatures;
};


var cities = [
    new City("Manchester, UK", [4, 1, 3, 3, -1, 3, 8, 7, 7, 7, 8, 2, 2, 3, 7, 8, 6, 7, 6, 4, 2, 1, 3, 4, 4, 0, 1, 3, 3, 7, 7, 9, 10, 7, 4, 3, 2, 6, 3, 2, 2, 2, 3, 7, 6, 8, 7, 9, 8, 9, 12, 8, 9, 7, 6, 8, 8, 3, 2, 4, 6, 7, 8, 4, 7, 6, 8, 8, 9, 11, 9, 7, 10, 10, 8, 7, 11, 11, 7, 6, 4, 6, 8, 8, 9, 8, 7, 11, 14, 13, 11, 9, 9, 9, 8, 6, 8, 10, 14, 8, 8, 9, 8, 10, 8, 8, 8, 6, 8, 10, 11, 8, 8, 7, 4, 6, 4, 9, 9, 12, 12, 11, 11, 12, 11, 9, 12, 9, 10, 10, 13, 12, 13, 14, 13, 16, 10, 10, 11, 10, 13, 16, 15, 17, 18, 21, 20, 14, 14, 14, 13, 18, 14, 14, 13, 12, 12, 13, 16, 14, 16, 14, 13, 16, 17, 17, 16, 21, 19, 21, 20, 21, 17, 16, 16, 13, 14, 14, 12, 13, 14, 17, 14, 14, 16, 18, 21, 17, 16, 17, 14, 13, 16, 18, 14, 17, 17, 16, 18, 19, 16, 17, 16, 16, 17, 17, 17, 14, 16, 14, 16, 16, 16, 17, 17, 16, 14, 13, 16, 13, 14, 13, 13, 14, 13, 16, 16, 16, 18, 13, 13, 13, 14, 19, 16, 16, 16, 16, 14, 17, 13, 12, 13, 11, 12, 13, 17, 16, 13, 13, 13, 13, 13, 13, 13, 11, 11, 11, 11, 12, 12, 11, 14, 11, 11, 14, 16, 14, 13, 14, 16, 13, 11, 14, 13, 12, 11, 12, 9, 12, 13, 13, 14, 13, 11, 17, 18, 16, 17, 12, 8, 12, 11, 12, 10, 12, 13, 12, 12, 8, 10, 8, 4, 10, 9, 10, 9, 8, 6, 6, 7, 3, 8, 9, 7, 6, 2, 9, 10, 6, 4, 8, 3, 10, 12, 14, 7, 3, 3, 4, 6, 3, 3, 0, 3, 4, 8, 7, 7, 9, 7, 2, -1, 0, -1, -2, 3, 3, 2, 0, 5, 2, 4, 9, 9, 9, 7, 9, 8, 3, 0, 1, 3, 6, 8]),
    new City("Phoenix, AZ, USA", [12, 11, 12, 13, 14, 14, 13, 17, 16, 16, 14, 14, 16, 16, 13, 14, 12, 13, 11, 11, 12, 12, 13, 10, 9, 9, 9, 10, 13, 16, 16, 16, 16, 16, 16, 16, 16, 17, 18, 20, 21, 21, 19, 19, 19, 19, 18, 19, 15, 13, 16, 18, 19, 13, 12, 13, 16, 14, 15, 14, 17, 18, 19, 19, 16, 16, 19, 22, 23, 24, 23, 25, 26, 26, 26, 26, 27, 27, 28, 27, 23, 17, 18, 21, 21, 22, 20, 22, 23, 17, 17, 20, 22, 20, 22, 24, 25, 24, 22, 22, 23, 25, 27, 24, 24, 25, 26, 27, 27, 26, 26, 27, 29, 27, 26, 25, 26, 25, 21, 23, 26, 28, 29, 31, 33, 30, 21, 22, 19, 21, 25, 29, 29, 28, 26, 21, 24, 25, 24, 27, 30, 32, 33, 33, 33, 29, 28, 31, 32, 32, 32, 32, 32, 34, 35, 35, 36, 34, 33, 34, 32, 32, 29, 28, 31, 33, 34, 34, 36, 38, 39, 40, 39, 38, 39, 41, 39, 37, 36, 36, 36, 36, 36, 37, 38, 38, 38, 41, 40, 37, 37, 34, 36, 37, 36, 37, 32, 31, 33, 33, 34, 34, 35, 32, 28, 33, 35, 38, 34, 34, 32, 36, 34, 32, 32, 32, 35, 35, 35, 35, 37, 36, 35, 33, 30, 33, 34, 33, 33, 34, 34, 34, 35, 36, 34, 33, 36, 37, 38, 38, 37, 37, 36, 37, 34, 34, 34, 36, 37, 35, 32, 32, 34, 37, 37, 36, 34, 31, 30, 31, 30, 30, 30, 29, 28, 24, 23, 24, 24, 27, 27, 29, 29, 29, 27, 28, 29, 31, 28, 27, 27, 26, 25, 29, 27, 28, 27, 27, 29, 29, 29, 29, 26, 24, 25, 27, 28, 28, 27, 25, 26, 26, 24, 23, 23, 23, 22, 24, 22, 22, 23, 23, 24, 23, 22, 22, 24, 23, 22, 23, 22, 20, 19, 19, 19, 22, 23, 22, 22, 23, 21, 18, 19, 21, 21, 22, 21, 17, 14, 17, 14, 12, 16, 21, 18, 16, 17, 16, 16, 14, 13, 14, 13, 14, 10, 8, 10, 13, 13, 13, 16, 15, 16, 17, 14]),
    new City("Tromsø, Norway", [-2, -6, -8, -12, -6, 1, 2, 2, -1, -5, -3, -3, -2, -1, -4, -1, 2, 0, -2, -3, -2, -4, -6, -4, 2, 3, 4, 4, 4, -1, -1, -4, -1, -3, -4, -3, -2, -7, -8, -8, -8, -4, 2, 4, 1, 2, 3, -2, -4, -7, -4, -6, -10, -9, -4, -4, -3, -6, -7, -6, -4, -4, -4, -4, -6, -6, -4, -3, -1, -2, -4, -3, 3, 2, -1, -1, -3, -4, -2, 2, 1, -1, 0, 2, 2, -3, -3, -4, -3, -2, -2, -3, 1, 3, 2, -1, -2, -2, -2, 0, -2, -2, -2, -2, -3, -2, -2, -2, 0, 2, 1, 2, 1, -2, -1, -2, 0, 1, 1, 1, 2, 3, 3, 4, 4, 1, -2, -1, 0, 1, 0, 1, 2, 2, 3, 6, 7, 8, 5, 4, 6, 6, 3, 4, 4, 3, 4, 5, 2, 1, 3, 4, 4, 5, 5, 5, 9, 13, 16, 16, 12, 12, 12, 9, 11, 11, 8, 9, 9, 11, 10, 7, 7, 8, 9, 9, 12, 9, 9, 9, 10, 12, 13, 8, 7, 7, 8, 9, 9, 16, 14, 14, 12, 9, 11, 12, 14, 10, 10, 10, 9, 9, 11, 14, 14, 13, 10, 11, 11, 11, 9, 11, 13, 12, 12, 11, 13, 13, 12, 12, 10, 12, 12, 14, 11, 9, 9, 9, 11, 12, 12, 10, 8, 7, 9, 9, 7, 8, 9, 9, 12, 11, 9, 7, 9, 12, 11, 11, 11, 9, 9, 8, 11, 12, 10, 11, 10, 7, 8, 8, 8, 6, 6, 7, 9, 8, 10, 9, 8, 8, 7, 7, 8, 11, 10, 10, 8, 6, 4, 6, 4, 4, 3, 4, 6, 5, 6, 7, 4, 6, 4, 2, 0, 2, 1, -1, -1, 3, 3, 4, 0, -1, -1, -2, -1, 2, 3, 4, 0, 2, 2, 4, 3, 2, 2, -1, 0, 2, 1, -1, -4, -6, -6, -6, -2, -3, -2, -1, -1, 1, 1, -1, -2, -4, -1, 0, 0, -1, -2, -3, -4, -3, -2, -1, 0, -4, -6, -1, -5, -3, -2, -2, 2, 3, 3, 1, -3, -3, -9, -7, -6, -6, -6, -3, 0])
];

var DEFAULT_CITY = 2;

function addCityDropDownMenu()
{
    let elem = document.getElementById("selectCity");
    let html = "<select id=\"citySelector\" onChange=\"redraw()\">";
    for (city = 0; city < cities.length; city++)
    {
        html += "<option value=\"" + city + "\""
        if (city == DEFAULT_CITY)
        {
            html += "selected=\"selected\"";
        }
        html += ">" + cities[city].name + "</option>";
    }
    html += "</select>";

    elem.innerHTML = html;
}


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