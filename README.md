# A temperature blanket designer!

For those unfamiliar with *temperature blankets*: The idea is to create a blanket that tracks the temperature in your chosen location for a period of time.
Ranges of degree are mapped into colours, and for each day the project covers, the creator of the blanket might add a stripe, a square, a hexagon or some other shape in that colour.

[The simplest kind of temperature blanket consists of stripes, one row worked per day.](https://www.ravelry.com/patterns/library/temperature-gauge-afghan)
[Some temperature blankets may track the high and the low temperature.](https://www.ravelry.com/patterns/library/daily-temperature-blanket)

Often the blanket is made as new temperatures are observed, and part of the fun is that you can't predict what the weather will be like.
Sometimes people might make birthday or anniversary blankets for past years' temperatures.
Looking at last year's temperatures will be an obvious way to figure out how to space your colours to make a blanket that is just as multicoloured as you want it, but a common problem us humans face is that we're very visual creatures and the fact that you'll need three skeins of navy blue which will be striped into a total of 4500 square centimetres isn't necessarily very helpful to figure out if the blanket will look just a bit too dark. ;)
But worry not! Advanced *computer simulations* of your temperature blankets can easily be computed by advanced modern computers, like your own.

## Project notes

- Canvas is fun, but I've started wondering if I should just go with SVG after all, because it might be fun to have things like mouseover tricks that tell you what date you're looking at when you hover over the blanket, and that's far easier to do with SVG.
- I want some data visualizations, also for the controls, and I keep looking at D3.js which I wanted to learn a long time ago but never did.
- There will definitely be more shapes to experiment with, and the low/high temperature option which doesn't exist right now.
- I've made some decidedly awful choices for data structures during the first day of development, so I'll probably call the first version a "prototype" and dump it and rewrite everything. But sometimes the momentum that builds with action is worth the wasted time from not planning enough.
- It has also come to my attention that I should learn about writing tests for JavaScript programs. (It's a foreign language for me, so bear with me here.)