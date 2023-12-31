import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { TMapContent } from "./type";
import useAddmaker from "./hooks/useAddmaker";
import useLocation, { locationObject } from "./hooks/useLocation";
import useTaxiCreatore from "./taxi/useTaxiCreatore";
import useRoutes from "./taxi/useRoutes";
import Search from "./Search";

const apiKey = import.meta.env.VITE_API_MAP_KEY;

const MapCont = () => {
  const location: locationObject = useLocation();
  const [destinationMarker, setDestinationMarker] = useState<tt.Marker | null>(
    null
  );
  const { handleTaxi } = useTaxiCreatore();
  const { submitButtonHandler } = useRoutes();
  const [myMap, setMyMap] = useState<tt.Map | null>(null);
  const [dragedLngLat, setDragedLngLat] = useState<object>({});

  const divRef = useRef<HTMLDivElement | null>(null!);
  const { addmarker, mapClick } = useAddmaker({
    setDragedLngLat,
  });

  useEffect(() => {
    if (location) {
      const mapOptions: TMapContent = {
        key: apiKey,
        container: "map",
        zoom: 14,
        center: [location.long, location.lat],
        stylesVisibility: {
          trafficIncidents: true,
          trafficFlow: true,
        },
      };
      const map = tt.map(mapOptions);
      setMyMap(map);

      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());
      const geolocateControl = new tt.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
      });

      map.addControl(geolocateControl);
      geolocateControl.on("geolocate", () => {
        map.setZoom(6);
      });
      const staticIndicator = new tt.Marker({
        element: document.createElement("div"),
      })
        .setLngLat([location.long, location.lat])
        .addTo(map);
      staticIndicator.getElement().className = "marker";
      console.log(dragedLngLat);
      handleTaxi(map);
      const newDestinationMarker = addmarker(
        map,
        new tt.Popup({ offset: [0, -30] }).setHTML(
          "click on any part of the map"
        ),
        [location.long, location.lat]
      );
      setDestinationMarker(newDestinationMarker);
    }
  }, [location]);
  useEffect(() => {
    const mapOnclick = () => {
      myMap &&
        myMap.on("click", (event) => {
          destinationMarker &&
            mapClick(event, apiKey, destinationMarker, setDestinationMarker);
        });
    };

    mapOnclick();
    return () => {
      mapOnclick();
    };
  }, [destinationMarker?.getLngLat()]);

  const handler = () => {
    myMap &&
      destinationMarker &&
      submitButtonHandler(
        myMap,
        [location.long, location.lat],
        destinationMarker,
        apiKey
      );
  };

  return (
    <div className="w-full h-screen z-30" id="map">
      <Search
        myMap={myMap}
        setDragedLngLat={setDragedLngLat}
        destinationMarker={destinationMarker}
        setDestinationMarker={setDestinationMarker}
      />
      <div className="marker " ref={divRef}></div>
      <button
        className="bg-red-700 p-3 w-1/4 absolute z-50 hidden"
        onClick={handler}
      >
        submit
      </button>
    </div>
  );
};

export default MapCont;
