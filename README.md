# A Wild Onsen Chase

A scrollytelling map of a winter trip I took through northern Japan, built with QGIS, Illustrator, React, and Scrollama.

**Published map: [a-wild-onsen-chase](https://isobakhtiari.github.io/a-wild-onsen-chase/)**

## What I aimed to accomplish

My goal was to build a map in QGIS of a trip I took along Japan's railway network in February using railroad network geospatial data to draw the exact route I travelled. I then wanted to refine this map in Illustrator and build it into a scrolly-telling piece. My inspiration for the scrolly-telling is based on this NYT piece, which Aaron pointed me to: https://www.nytimes.com/newsgraphics/2013/07/21/silk-road/index.html 

## Finished map

On the right handside of the page, a map traces a single route: Tokyo → Nozawa Onsen → Tsukioka → Aomori → Hakodate → Niseko. At each stop, the map highlights an onsen I visited. On the left handside of the page, text and accompanying photos or videos I took on the trip add context to each stop and some information about the onsen highlighted on the map.

## Data collection

**Base map**
I first tried to build the base map of Japan only with Natural Earth datasets, but the road and railway coverage wasn't great in Japan. Instead, I only used the populated places and urban areas datasets from Natural Earth, and downloaded the geospatial data for the lakes, rivers, roads and railroad network from the National Land Numerical Information service, provided by Japan's Ministry of Land, Infrastructure, Transport and Tourism (MLIT): https://nlftp.mlit.go.jp/ksj/index.html

Datasets downloaded: 
- Populated places: https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/
- Urban areas: https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-urban-area/ 
- Railroads: https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-2025.html
- Roads: https://nlftp.mlit.go.jp/ksj/old/datalist/old_KsjTmplt-N01.html 
- Lakes and marshes: https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-W09-2005.html
- Administrative boundary areas: https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-2026.html 

**Route travelled**
To draw the route I travelled, I geocoded the destination stops and stations along the route. E.g. to map the route from Iiyama Station to Nozawa Onsen, I geocoded the latitude and longitude of Iiyama Station (origin_lat, origin_lon) and then the lat,lon of Nozawa Onsen town (destination_lat, destination_lon).

- data/transport_route_segments.csv

**Onsens**
To plot the Onsen locations on the base map, I geocoded the latitude and longitude of each onsen. 

- data/onsen_locations.csv

For the Onsen properties: mineral density, pH and geologic origin, I manually collected this data by researching each onsen. I then categorised the five onsens. E.g. acidic or alkaline for the water pH.

## Build process

I pulled the geospatial data into QGIS to build my base map. I followed a tutorial from Larry Buchanan at the NYT to style the base map similarly to a NYT map of Ukraine. I overlaid the geocoded onsen locations by adding a Text Deliminated Layer in QGIS and I set the height of the shapes to the mineral density category in my dataset. To draw the route travelled, I calculated the shortest path using the processing toolbox panel on the railroad layer by selecting the origin and destination lat,lon for each leg of the trip. The routes were not correct and I realised I would need to filter the railroad layer by type of train: shinkansen or local. I filtered the railroad layer and exported the filtered layers as two new shapefiles: shinkansen.shp and local_conventional_lines.shp. I then calculated the shortest route on the filtered layers depending on which leg of the trip it was. I confirmed the calculated route for each leg matched the railroad layer network. 

Once I had my map, I exported a new print layout as an SVG and imported this in to Illustrator. I then styled the map in Illustrator. I added in some custom symbols to layer more information about the onsen characteristics at this point: pH and geologic origin of the onsen water. I wanted to create a scrolly-telling piece, where each leg of the trip would appear sequentially and so I exported 12 versions of the map: 
- /public/assets/baseMap...

I then used React and Scollama to essentially build a slideshow of the illustrator maps as the reader scrolls down.

## What I learned 

This was my first time working with geospatial data and building a map in QGIS and so there was was a big learning curve with this project. There was a lot of troubleshooting on minor problems in QGIS and learning various tricks with the processing toolbox. For example, when I loaded the administrative boundary data, it was 123,025 costal/island polygon fragments and I had to use the dissolve tool to make this into 47 prefecture features to remove the million repeated labels. I also learned how to join datasets in QGIS as I had to translate the Japanese names to English names. I learned a lot about the projection you choose and making sure to check each layer projection when importing as I often ran into a missing or wrong CRS assignment issue. 

## What I didn't get to / would do with more time

- I would have liked to draw the route in D3 and project over the base map. That way as the user scrolls up, the route draws itself out rather than simply crossfading between each route leg.
- I would also have liked the map to be zoomed in when the reader loads the page. So as the user scrolls the map itself moves up through Japan, rather than staying static in full view. This would be more similar to the NYT reference piece.
- I would expand the project with a second map layering in the geology. It would be interesting to trace how Japan's volcanic terrain shapes its hot springs. This could be cool as a 3D raster-style map (QGIS + blender).
