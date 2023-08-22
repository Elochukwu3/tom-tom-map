import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";

type markerProp = {
  setDragedLngLat: React.Dispatch<React.SetStateAction<object>>;
  position?: [number, number] | undefined;
  element: HTMLElement | null;
};

type func = {
  mapClick: (event: tt.MapMouseEvent<"click">, apiKey: string) => void;
};

const useAddmaker = ({ setDragedLngLat, element }: markerProp): func => {
  let destinationMarker: tt.Marker;
  const addmarker = (
    map: tt.Map,
    popup: tt.Popup,
    position: [number, number]
  ): tt.Marker => {
    return new tt.Marker({
      draggable: false,
      element: element!,
    })
      .setLngLat(position)
      .setPopup(popup)
      .addTo(map);
  };
  //   destinationMarker = addmarker(map,  new tt.Popup({ offset: 35 }).setHTML(
  //     "Click anywhere on the map to change passenger location."
  //   ))
  function drawPassengerMarkerOnMap(geoResponse: any, map: tt.Map) {
    if (
      geoResponse &&
      geoResponse.addresses &&
      geoResponse.addresses[0].address.freeformAddress
    ) {
      destinationMarker.remove();
      destinationMarker = addmarker(
        map,
        new tt.Popup({ offset: 35 }).setHTML(
          geoResponse.addresses[0].address.freeformAddress
        ),
        geoResponse.addresses[0].position
      );
      destinationMarker.togglePopup();
    }
  }
  const mapClick = (
    event: tt.MapMouseEvent<"click">,
    apiKey: string,
    map: tt.Map
  ) => {
    const position = event.lngLat;
    setDragedLngLat(position);
    ttServices.services
      .reverseGeocode({
        key: apiKey,
        position: position,
      })
      .then(function (results: any) {
        drawPassengerMarkerOnMap(results, map);
      });
  };

  return { mapClick };
};

export default useAddmaker;
