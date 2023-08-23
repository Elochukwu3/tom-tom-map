import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";

type markerProp = {
  setDragedLngLat: React.Dispatch<React.SetStateAction<object>>;
  position?: [number, number] | undefined;
  element: HTMLElement | null;
  map?: tt.Map | undefined | null;
};

type func = {
  mapClick: (
    event: tt.MapMouseEvent<"click">,
    apiKey: string,
    map: tt.Map,
    destinationMarke: tt.Marker
  ) => void;
  addmarker: (
    map: tt.Map,
    popup: tt.Popup,
    position: [number, number]
  ) => tt.Marker;
};

const useAddmaker = ({ setDragedLngLat, element }: markerProp): func => {
  const addmarker = (
    map: tt.Map,
    popup: tt.Popup,
    position: [number, number]
  ): tt.Marker => {
    return new tt.Marker({
      draggable: false,
     element: document.createElement("div"),
    })
      .setLngLat(position)
      .setPopup(popup)
      .addTo(map)
  };

  function drawPassengerMarkerOnMap(
    geoResponse: any,
    map: tt.Map,
    destinationMarker: tt.Marker
  ) {
    if (
      geoResponse &&
      geoResponse.addresses &&
      geoResponse.addresses[0].address.freeformAddress
    ) {
      destinationMarker.remove();
      destinationMarker = addmarker(
        map,
        new tt.Popup({ offset: [0, -30]}).setHTML(
          geoResponse.addresses[0].address.freeformAddress
        ),
        geoResponse.addresses[0].position
      );
      destinationMarker.getElement().className = "marker";
      destinationMarker.togglePopup();
    }
  }
  const mapClick = (
    event: tt.MapMouseEvent<"click">,
    apiKey: string,
    map: tt.Map,
    destinationMarker: tt.Marker
  ) => {
    const position = event.lngLat;
    setDragedLngLat(position);
    ttServices.services
      .reverseGeocode({
        key: apiKey,
        position: position,
      })
      .then(function (results: any) {
        drawPassengerMarkerOnMap(results, map, destinationMarker);
      });
  };

  return { addmarker, mapClick };
};

export default useAddmaker;
