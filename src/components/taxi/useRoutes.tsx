import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";
import useTaxiCreatore from "./useTaxiCreatore";

const useRoutes = () => {
  const { handleTaxi, setDefaultTaxiConfig, taxiArray } = useTaxiCreatore();
  let routes: any[] = [];
  const routeWeight = "9";
  const routeBackgroundWeight = "12";

  function clear(map: tt.Map, passengerMarker: tt.Marker) {
    routes.forEach(function (child) {
      map.removeLayer(child[0]);
      map.removeLayer(child[1]);
      map.removeSource(child[0]);
      map.removeSource(child[1]);
    });
    routes = [];
    setDefaultTaxiConfig();
    passengerMarker.togglePopup();
  }
  function submitButtonHandler(
    map: tt.Map,
    location: [number, number],
    passengerMarker: tt.Marker,
    apiKey: string
  ) {
    clear(map, passengerMarker);
    let taxiPassengerBatchCoordinates: string[] = [];

    function updateTaxiBatchLocations(passengerCoordinates: any) {
      taxiPassengerBatchCoordinates = [];
      taxiArray.forEach((taxi) => {
        taxiPassengerBatchCoordinates.push(
          taxi.coordinates + ":" + passengerCoordinates
        );
      });
    }
    setDefaultTaxiConfig();
    updateTaxiBatchLocations(location);
    let bestRouteIndex: number;
    const drawAllRoute = async () => {
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
      try {
        const result = await calRoute;
        console.log(result);
        result.batchItems.forEach(function (singleRoute: any, index) {
          const routeGeoJson = singleRoute.toGeoJson();
          const route: string[] = [];
          const route_background_layer_id = "route_background_" + index;
          const route_layer_id = "route_" + index;
          map
            .addLayer(
              buildStyle(
                route_background_layer_id,
                routeGeoJson,
                "black",
                routeBackgroundWeight
              )
            )
            .addLayer(
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
            map.moveLayer(route_background_layer_id)
            map.moveLayer(route_layer_id)
          })
  
          map.on("mouseleave", route_layer_id, function () {
            bringBestRouteToFront()
          })
        });
      } catch (error) {
        console.log(error);
      }
      bringBestRouteToFront()
    };
    function bringBestRouteToFront() {
        map.moveLayer(routes[bestRouteIndex][0])
        map.moveLayer(routes[bestRouteIndex][1])
      }
    drawAllRoute();
  }

  function buildStyle(
    id: string,
    data: string,
    color: string,
    width: string
  ): tt.Layer {
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
