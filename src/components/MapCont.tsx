import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { TMapContent } from "./type";
import useAddmaker from "./hooks/useAddmaker";
import useLocation from "./hooks/useLocation";

const apiKey = import.meta.env.VITE_API_MAP_KEY;

const MapCont = () => {
    const location:object = useLocation()
  const [myMap, setMyMap] = useState<tt.Map | null>(null);
  const [latitude, setLatitude] = useState<number>(location?.latitude);
  const [dragedLngLat, setDragedLngLat] = useState<object>({});
  const [longitude, setlongitude] = useState<number>(3.3792);
  const [loader, setLoader] = useState<Boolean>(true);

  const divRef = useRef<HTMLDivElement | null>(null!);
  const { addmarker } = useAddmaker({
    setDragedLngLat,
    longitude,
    latitude,
    element: divRef?.current,
  });

  useEffect(() => {
    const mapOptions: TMapContent = {
      key: apiKey,
      container: "map",
      zoom: 14,
      center: [longitude, latitude],
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
    };
    setLoader(false);
    const map = tt.map(mapOptions);
    addmarker(map);
    setMyMap(map);

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    map.addControl(new tt.LngLatBounds)

    const staticIndicator = new tt.Marker({
        element: document.createElement("div"),
      }).setLngLat([longitude, latitude])
      .addTo(map)
      staticIndicator.getElement().className = "marker"
  }, [latitude, longitude]);


  return (
    <div className="w-full h-full" id="map">
            <div className="marker" ref={divRef}></div>
          </div>
  );
};

export default MapCont;
