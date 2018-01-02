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

    let colourRange = null;
    if (selectionValue == "uniform")
    {
        colourRange = new ColourRangeFromTemperatures(city.temperatures);
    }
    else
    {
        let startingPoint = Number(document.getElementById("startingPoint").value);
        let stepSize = Number(document.getElementById("stepSize").value);
        colourRange = new ColourRangeFromStepSize(startingPoint, stepSize);
    }

    drawTemperatureBlanket(city, colourRange, "stripes");
}


// Initialize
addCityDropDownMenu();
addColourRangeMenu();

// Pre-draw
drawTemperatureBlanket(
    cities[DEFAULT_CITY],
    new ColourRangeFromTemperatures(cities[DEFAULT_CITY].temperatures),
    "stripes"
);