import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";
import useTaxiCreatore from "./useTaxiCreatore";
import { useState, useEffect } from "react";

const useRoutes = () => {
  const { taxiArray } = useTaxiCreatore();
  const [taxiPassengerBatchCoordinates, setTaxiPassengerBatchCoordinates] =
    useState<string[]>([]);
  const [bestRouteIndex, setBestRouteIndex] = useState<number>(0);
  let routes: any[] = [];
  const routeWeight = 9;
  const routeBackgroundWeight = 12;

  function clear(map: tt.Map, passengerMarker: tt.Marker) {
    routes.forEach(function (child) {
      map.removeLayer(child[0]);
      map.removeLayer(child[1]);
      map.removeSource(child[0]);
      map.removeSource(child[1]);
    });
    routes = [];
    passengerMarker.togglePopup();
  }
  function submitButtonHandler(
    map: tt.Map,
    location: [number, number],
    passengerMarker: tt.Marker,
    apiKey: string
  ) {
    clear(map, passengerMarker);

    function updateTaxiBatchLocations(passengerCoordinates: [number, number]) {

      const updatedCoordinates: string[] = [];
      taxiArray.forEach((taxi) => {
        updatedCoordinates.push(
          taxi.coordinates.join(",") + ":" + passengerCoordinates.join(",")
        );
      });
      setTaxiPassengerBatchCoordinates(updatedCoordinates);
    }

    // let bestRouteIndex: number;
    updateTaxiBatchLocations(location);
    const drawAllRoute = () => {
      const calRoute = ttServices.services.calculateRoute({
        batchMode: "sync",
        key: apiKey,
        batchItems: [
          { locations: taxiPassengerBatchCoordinates[0] },
          { locations: taxiPassengerBatchCoordinates[1] },
          { locations: taxiPassengerBatchCoordinates[2] },
          { locations: taxiPassengerBatchCoordinates[3] },
        ],
      });
      calRoute.then((result) => {
        
        const newBestRouteIndex = calculateBestRouteIndex(result.batchItems);
        setBestRouteIndex(newBestRouteIndex);
        result.batchItems.forEach(function (singleRoute: any, index) {
          const routeGeoJson = singleRoute.toGeoJson();
          const route: string[] = [];
          const route_background_layer_id = "route_background_" + index;
          const route_layer_id = "route_" + index;
          const existing_route_background_layer_id = map.getLayer(
            route_background_layer_id
          );
          const existing_routeLayer = map.getLayer(route_layer_id);

          !existing_route_background_layer_id &&
            map.addLayer(
              buildStyle(
                route_background_layer_id,
                routeGeoJson,
                "black",
                routeBackgroundWeight
              )
            );
          !existing_routeLayer &&
            map.addLayer(
              buildStyle(
                route_layer_id,
                routeGeoJson,
                taxiArray[index].color,
                routeWeight
              )
            );

          route[0] = route_background_layer_id;
          route[1] = route_layer_id;
          routes[index] = route;

          if (index === bestRouteIndex) {
            const bounds = new tt.LngLatBounds();
            routeGeoJson.features[0].geometry.coordinates.forEach(function (
              point: any
            ) {
              bounds.extend(tt.LngLat.convert(point));
            });
            map.fitBounds(bounds, { padding: 150 });
          }
          map.on("mouseenter", route_layer_id, function () {
            map.moveLayer(route_background_layer_id);
            map.moveLayer(route_layer_id);
          });

          map.on("mouseleave", route_layer_id, function () {
            bringBestRouteToFront();
          });
        });
        bringBestRouteToFront();
      });
    };
    function bringBestRouteToFront() {
      map.moveLayer(routes[bestRouteIndex][0]);
      map.moveLayer(routes[bestRouteIndex][1]);
    }
    drawAllRoute();
  }

  function buildStyle(
    id: string,
    data: string,
    color: string,
    width: number
  ): tt.AnyLayer {
    return {
      id: id,
      type: "line",
      source: {
        type: "geojson",
        data: data,
      },
      paint: {
        "line-color": color,
        "line-width": width,
      },
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
    };
  }

  return { submitButtonHandler };
};

export default useRoutes;
function calculateBestRouteIndex(batchItems: any[]): number {
  let shortestDuration = Number.MAX_VALUE;
  let bestIndex = -1;

  batchItems.forEach((singleRoute, index) => {
    let routeDuration = singleRoute.toGeoJson();
    routeDuration =
      routeDuration.features[0].properties.summary.travelTimeInSeconds;
      console.log(routeDuration);
      
    if (routeDuration < shortestDuration) {
      shortestDuration = routeDuration;
      bestIndex = index;
    }
  });

  return bestIndex;
}

//     // drawAllRoutes()

  

//   function callMatrix() {
//     const origins = buildOriginsParameter()
//     const destinations = buildDestinationsParameter()
//     tt.services
//       .matrixRouting({
//         key: apiKey,
//         origins: origins,
//         destinations: destinations,
//         traffic: true,
//       })
//       .then(processMatrixResponse)
//   }