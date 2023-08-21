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
    const popupFunc = new tt.Popup({offset:[0, -25]}).setHTML("This is you")
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
    marker.setPopup(popupFunc).togglePopup()
  };

  return { addmarker };
};

export default useAddmaker;
