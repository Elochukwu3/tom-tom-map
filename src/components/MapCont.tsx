import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { TMapContent } from "./type";
import useAddmaker from "./hooks/useAddmaker";
import useLocation, { locationObject } from "./hooks/useLocation";
import useTaxiCreatore from "./taxi/useTaxiCreatore";

const apiKey = import.meta.env.VITE_API_MAP_KEY;

const MapCont = () => {
  const location: locationObject = useLocation();
  const { handleTaxi } = useTaxiCreatore();
  const [myMap, setMyMap] = useState<tt.Map | null>(null);
  const [dragedLngLat, setDragedLngLat] = useState<object>({});

  const divRef = useRef<HTMLDivElement | null>(null!);
  const { addmarker, mapClick } = useAddmaker({
    setDragedLngLat,
    element: divRef?.current,
  });
  let destinationMarker: tt.Marker;
  
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

      const staticIndicator = new tt.Marker({
        element: document.createElement("div"),
      })
        .setLngLat([location.long, location.lat])
        .addTo(map);
      staticIndicator.getElement().className = "marker";
      console.log(myMap, dragedLngLat);
      handleTaxi(map);
      map.on("click", (event) => {
        mapClick(event, apiKey, map);
      });
    }
  }, [location]);

  return (
    <div className="w-full h-full" id="map">
      <div className="marker " ref={divRef}></div>
    </div>
  );
};

export default MapCont;
