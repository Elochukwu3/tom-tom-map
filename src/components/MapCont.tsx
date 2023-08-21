import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css"
import { TMapContent } from "./type";

const apiKey = import.meta.env.VITE_API_MAP_KEY;

const MapCont = () => {
  const [map, setMap] = useState<tt.Map | null>(null);
  const [latitude, setLatitude] = useState<number>(6.5244);
  const [longitude, setlongitude] = useState<number>(3.3792);
  const divRef = useRef<HTMLDivElement | null>(null!);

  useEffect(() => {

      const mapOptions: TMapContent = {
        key: apiKey,
        container: "map",
        zoom: 14,
        center:[longitude, latitude],
        stylesVisibility:{
            trafficIncidents: true,
            trafficFlow: true,
        }
      };
      const map = tt.map(mapOptions);
      setMap(map);
      map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());
  }, []);

  return (
    <div className="w-full h-full" id="map">
      MapCont
    </div>
  );
};

export default MapCont;
