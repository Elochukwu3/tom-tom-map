import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";
import { buildStyle } from "./taxi/buildStyleFormat";

 type map = tt.Map

const drawRouteOnSearch = (key:string, map:map, position:[number, number], userLocation:[number, number])=>{
    const obtainedLocation = position.join(",")
    const userloc =  userLocation.join(",");
    const combinedRouteLocation = [`${obtainedLocation}: ${userloc}`]
    const calCRoute = ttServices.services.calculateRoute({
        key: key,
        locations: combinedRouteLocation,
    })
     calCRoute.then((response)=>{
        console.log(response);
        // buildStyle
        const geoJson = response.toGeoJson();
        const id = "route_id";
        const color = "#00d7ff";
        const mapExisting = map.getLayer(id)
          if(!mapExisting ){
        const dataCoverter = buildStyle(id, geoJson, color, 10)
        map.addLayer(dataCoverter)
          }
        
     })
}
export default drawRouteOnSearch