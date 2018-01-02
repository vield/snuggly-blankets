function drawTemperatureBlanket(city, colourRange, style)
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
