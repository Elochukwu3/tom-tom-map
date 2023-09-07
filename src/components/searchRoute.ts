import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";
import { buildStyle } from "./taxi/buildStyleFormat";

type map = tt.Map;
let routeLayerId: string | null = null;

const drawRouteOnSearch = (
  key: string,
  map: map,
  position: [number, number],
  userLocation: [number, number]
) => {
  const obtainedLocation = position.join(",");
  const userloc = userLocation.join(",");
  const combinedRouteLocation = [obtainedLocation, userloc];
  const calCRoute = ttServices.services.calculateRoute({
    key: key,
    locations: combinedRouteLocation,
  });
  calCRoute.then((response) => {
    const clearRoute = () => {
        if (routeLayerId) {
          map.removeLayer(routeLayerId);
          map.removeSource(routeLayerId); // Remove the associated source as well
          routeLayerId = null; // Reset the route layer ID
        }
      };
      clearRoute()
    console.log(response);
    console.log("response");
    // buildStyle
    const geoJson = response.toGeoJson();
    let layerId= "route_id";
    const color = "black";
    const mapExisting = map.getLayer(layerId);
    if (!mapExisting) {
      const dataCoverter = buildStyle(layerId, geoJson, color, 9) ;
      map.addLayer(dataCoverter);
      routeLayerId = layerId
        let bounds = new tt.LngLatBounds()
    geoJson.features[0].geometry.coordinates.forEach(function (point:any) {
      bounds.extend(tt.LngLat.convert(point))
    })
    map.fitBounds(bounds, { padding: 20 })
    }
  });
};
export default drawRouteOnSearch;
