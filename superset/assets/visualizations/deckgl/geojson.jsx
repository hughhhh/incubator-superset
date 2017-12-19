import React from 'react';
import ReactDOM from 'react-dom';
import { GeoJsonLayer } from 'deck.gl';

// make more sopisticated translate into whatever deckGl needs
import { hexToRGB } from '../../javascripts/modules/colors';
import DeckGLContainer from './DeckGLContainer';

/*
  1 - User provides geojson.properties
      > apply mapping
  2 - if Opacity != 0 apply colors from user data
      > else apply mapping
  3 - no properties
      > fallback on some type of default (colorPrimary)
*/

const propertyMap = {
  color: 'fillColor',
  fill: 'fillColor'
  'fill-color': 'fillColor',
  'stroke-color': 'strokeColor',
  'stroke-width': 'strokeWidth',

}

function DeckGeoJsonLayer(slice, payload, setControlValue) {
  const fd = slice.formData;
  const c = fd.color_picker;
  const data = payload.data.geojson.features.map(d => ({
    ...d,
    properties: {
      fillColor: [c.r, c.g, c.b, 255 * c.a],
      elevation: 2000,
    },
  }));

  const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data,
    filled: true,
    stroked: false,
    extruded: true,
    pointRadiusScale: 100,
  });

  const viewport = {
    ...fd.viewport,
    width: slice.width(),
    height: slice.height(),
  };
  ReactDOM.render(
    <DeckGLContainer
      mapboxApiAccessToken={payload.data.mapboxApiKey}
      viewport={viewport}
      layers={[layer]}
      mapStyle={fd.mapbox_style}
      setControlValue={setControlValue}
    />,
    document.getElementById(slice.containerId),
  );
}
module.exports = DeckGeoJsonLayer;
