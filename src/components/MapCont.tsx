import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import { TMapContent } from "./type";

const apiKey = import.meta.env.VITE_API_MAP_KEY;

const MapCont = () => {
  const [map, setMap] = useState<tt.Map | null>(null);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setlongitude] = useState<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null!);

  useEffect(() => {
    console.log(apiKey);

    if (divRef.current) {
      const mapOptions: TMapContent = {
        key: apiKey,
        container: "map",
        zoom: 14,
        latitude: latitude,
        longitude: longitude,
      };
      const map = tt.map(mapOptions);
      setMap(map);
    }
  }, []);

  return (
    <div className="w-full h-screen" id="map">
      MapCont
    </div>
  );
};

export default MapCont;
