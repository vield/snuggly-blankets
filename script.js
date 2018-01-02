var myCanvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


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

    drawTemperatureBlanket(city, colourRange, "stripes");
}


// Initialize
addCityDropDownMenu();
addColourMenu();
addColourRangeMenu();

// Pre-draw
drawTemperatureBlanket(
    cities[DEFAULT_CITY],
    new ColourRangeFromTemperatures(cities[DEFAULT_CITY].temperatures, COLOUR_MAPS[DEFAULT_COLOUR_MAP]),
    "stripes"
);