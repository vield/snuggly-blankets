var myCanvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


function redraw()
{
    drawTemperatureBlanket(
        getCityFromSelection(),
        getColourMapFromSelection(),
        getColourRangeFromSelection(),
        "stripes"
    );

    redrawColourRatios();
}


// Initialize
addCityDropDownMenu();
addColourMenu();
addColourRangeMenu();

// Pre-draw
redraw();
