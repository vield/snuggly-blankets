var myCanvas = document.getElementById("canvas");
var context = canvas.getContext("2d");



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

    let colourRange = null;
    if (selectionValue == "uniform")
    {
        colourRange = new ColourRangeFromTemperatures(city.temperatures);
        console.log(colourRange.ranges);
    }
    else
    {
        let startingPoint = Number(document.getElementById("startingPoint").value);
        let stepSize = Number(document.getElementById("stepSize").value);
        colourRange = new ColourRangeFromStepSize(startingPoint, stepSize);
        console.log(colourRange.ranges);
    }

    drawTemperatureBlanket(city, colourRange);
}


addCityDropDownMenu();
addColourRangeMenu();
drawTemperatureBlanket(cities[DEFAULT_CITY], new ColourRangeFromStepSize(-10, 3));