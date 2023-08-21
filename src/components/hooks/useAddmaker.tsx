import * as tt from "@tomtom-international/web-sdk-maps";

type markerProp = {
  setDragedLngLat: React.Dispatch<React.SetStateAction<object>>;
  longitude: number;
  latitude: number;
  element: HTMLElement | null;
};

const useAddmaker = ({
  setDragedLngLat,
  longitude,
  latitude,
  element,
}: markerProp) => {
  const addmarker = (map: tt.Map): void => {
    const marker = new tt.Marker({
      draggable: true,
      element: element!,
    })
      .setLngLat([longitude, latitude])
      .addTo(map);
    marker.on("dragend", (): void => {
      const LngLat: tt.LngLat = marker.getLngLat();
      setDragedLngLat(LngLat);
    });
  };

  return { addmarker };
};

export default useAddmaker;
