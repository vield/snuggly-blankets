function drawTemperatureBlanket(city, colourMap, colourRange, style)
{
    console.log("draw called!");

    context.beginPath();
    context.rect(0, 0, 600, 730);
    context.fillStyle = "white";
    context.fill();

    let lookup = {};

    for (i = 0; i < 365; i++)
    {
        // x, y, width, height
        context.beginPath();
        context.rect(0, i*2, 600, 2);
        context.fillStyle = getColourValueForTemperature(city.temperatures[i], colourMap, colourRange, lookup);
        context.fill();
    }
}
