import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";
import useTaxiCreatore from "./useTaxiCreatore";

const useRoutes = () => {
  const { handleTaxi, setDefaultTaxiConfig, taxiArray } = useTaxiCreatore();
  let routes: [] = [];
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
    setDefaultTaxiConfig();
    passengerMarker.togglePopup();
  }
  function submitButtonHandler(
    map: tt.Map,
    location: [number, number],
    passengerMarker: tt.Marker
  ) {
    clear(map, passengerMarker);
    let taxiPassengerBatchCoordinates: any = [];

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
    let bestRoute: any;
    const drawAllRoute = async () => {
      const calRoute = ttServices.services.calculateRoute({
        batchMode: "sync",
        key: "",
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
      } catch (error) {}
    };
  }

  // function buildStyle(id:string, data:string, color:string, width:string) {
  //   return {
  //     id: id,
  //     type: "line",
  //     source: {
  //       type: "geojson",
  //       data: data,
  //     },
  //     paint: {
  //       "line-color": color,
  //       "line-width": width,
  //     },
  //     layout: {
  //       "line-cap": "round",
  //       "line-join": "round",
  //     },
  //   }
  // }
  //   }
  return { submitButtonHandler };
};

export default useRoutes;
