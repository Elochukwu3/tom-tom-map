import { taxiProp } from "./type";
import useCreateTaxi from "./useCreateTaxi";
import * as tt from "@tomtom-international/web-sdk-maps";
import { useState, useEffect } from "react";
const useTaxiCreatore = () => {
  const [taxiArray, setTaxiArray] = useState<taxiProp[]>([]);

  const createTaxi = useCreateTaxi();

  function setDefaultTaxiConfig() {
    return [
      createTaxi("CAR #1", "#006967", [4.9041, 52.3676], "/image/cab-1.jpeg"),
      createTaxi(
        "CAR #2",
        "#EC619F",
        [4.927198, 52.365927],
        "/image/cab-2.jpeg"
      ),
      createTaxi(
        "CAR #3",
        "#002C5E",
        [4.893488, 52.347878],
        "/image/cab-3.png"
      ),
      createTaxi(
        "CAR #4",
        "#F9B023",
        [4.858433, 52.349447],
        "/image/cab-4.png"
      ),
    ];
  }
  useEffect(() => {
    const newData = setDefaultTaxiConfig()
    setTaxiArray(newData);
  }, []);
  const handleTaxi = (map: tt.Map): void => {
    taxiArray.forEach(function (taxi) {
      const carMarkerElement = document.createElement("div");
      carMarkerElement.innerHTML = taxi.icon;

      const marker = new tt.Marker({
        element: carMarkerElement,
        offset: [0, 27],
      });
      marker.setLngLat(taxi.coordinates);
      marker.addTo(map);
    });
  };

  return { handleTaxi, taxiArray };
};

export default useTaxiCreatore;
