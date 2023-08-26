import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";
import { markerProp, func } from "./type";

const useAddmaker = ({ setDragedLngLat }: markerProp): func => {
  const addmarker = (
    map: tt.Map,
    popup: tt.Popup,
    position: [number, number]
    // destinationMarker: tt.Marker
  ): tt.Marker => {
    // if(!destinationMarker){
    return new tt.Marker({
      draggable: false,
      element: document.createElement("div"),
    })
      .setLngLat(position)
      .setPopup(popup)
      .addTo(map);
    // }
  };

  function drawPassengerMarkerOnMap(
    geoResponse: any,
    map: tt.Map,
    destinationMarker: tt.Marker,
    setDestinationMarker: React.Dispatch<React.SetStateAction<tt.Marker | null>>
  ) {

    if (
      geoResponse &&
      geoResponse.addresses &&
      geoResponse.addresses[0].address.freeformAddress
    ) {
      // destinationMarker.remove();
      // console.log("click data");
      
      // const newDestinationMarker = addmarker(
      //   map,
      //   new tt.Popup({ offset: [0, -30] }).setHTML(
      //     geoResponse.addresses[0].address.freeformAddress
      //   ),
      //   geoResponse.addresses[0].position
      // );
      // setDestinationMarker(newDestinationMarker)
      // destinationMarker.getElement().className = "marker";
      // destinationMarker.togglePopup();

       // Update the marker's position and popup content
    destinationMarker.setLngLat(geoResponse.addresses[0].position);
    destinationMarker.setPopup(
      new tt.Popup({ offset: [0, -20] }).setHTML(
        geoResponse.addresses[0].address.freeformAddress
      )
    );
    

    // Update the marker's class and toggle popup
    destinationMarker.getElement().className = "marker";
    destinationMarker.togglePopup();

    // Update the marker state
    setDestinationMarker(destinationMarker);
    }
  }
  const mapClick = (
    event: tt.MapMouseEvent<"click">,
    apiKey: string,
    map: tt.Map,
    destinationMarker: tt.Marker,
    setDestinationMarker: React.Dispatch<React.SetStateAction<tt.Marker | null>>
  ) => {
    const position = event.lngLat;
    setDragedLngLat(position);
    ttServices.services
      .reverseGeocode({
        key: apiKey,
        position: position,
      })
      .then(function (results: any) {
        drawPassengerMarkerOnMap(
          results,
          map,
          destinationMarker,
          setDestinationMarker
        );
      });
  };

  return { addmarker, mapClick };
};

export default useAddmaker;
