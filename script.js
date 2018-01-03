var myCanvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


function redraw()
{
    // Get city from dropdown
    let citySelector = document.getElementById("citySelector");
    let cityIndex = citySelector.options[citySelector.selectedIndex].value;
    let city = cities[cityIndex];

    let colourSelector = document.getElementById("colourDropdown");
    let colourIndex = colourSelector.options[colourSelector.selectedIndex].value;
    let colourMap = COLOUR_MAPS[colourIndex];

    let colourRange = getColourRange();

    drawTemperatureBlanket(city, colourRange, "stripes");

    redrawColourRatios();
}


// Initialize
addCityDropDownMenu();
addColourMenu();
addColourRangeMenu();

// Pre-draw
redraw();