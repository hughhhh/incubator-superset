import { ArcLayer } from 'deck.gl';
import { hexToRGB } from '../../../javascripts/modules/colors';

export default function arcLayer(formData, payload) {
  const fd = formData;
  const data = payload.data.arcs;
  return new ArcLayer({
    id: `path-layer-${fd.slice_id}`,
    data,
    filled: true,
    stroked: false,
    extruded: true,
    pointRadiusScale: fd.point_radius_scale,
  });
}
