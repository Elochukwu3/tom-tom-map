import { taxiProp } from "./type";
import useCreateTaxi from "./useCreateTaxi";
import * as tt from "@tomtom-international/web-sdk-maps";

const TaxiCreatore = () => {
  let taxiArray: taxiProp[] = [];
  const createTaxi = useCreateTaxi();

  function setDefaultTaxiConfig() {
    taxiArray = [
      createTaxi("CAR #1", "#006967", [4.902642, 52.373627], "img/cab1.png"),
      createTaxi("CAR #2", "#EC619F", [4.927198, 52.365927], "img/cab2.png"),
      createTaxi("CAR #3", "#002C5E", [4.893488, 52.347878], "img/cab3.png"),
      createTaxi("CAR #4", "#F9B023", [4.858433, 52.349447], "img/cab4.png"),
    ];
  }
  const handleTaxi = (map: tt.Map): void => {
      setDefaultTaxiConfig();
    taxiArray.forEach(function (taxi) {
      const carMarkerElement = document.createElement("div");
      carMarkerElement.innerHTML = taxi.icon;
      new tt.Marker({ element: carMarkerElement, offset: [0, 27] })
        .setLngLat(taxi.coordinates)
        .addTo(map);
    });
  };

  return { handleTaxi, setDefaultTaxiConfig };
};

export default TaxiCreatore;
