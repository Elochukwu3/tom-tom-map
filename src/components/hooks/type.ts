import * as tt from "@tomtom-international/web-sdk-maps";

type markerProp = {
  setDragedLngLat: React.Dispatch<React.SetStateAction<object>>;
  position?: [number, number] | undefined;
  map?: tt.Map | undefined | null;
};
type func = {
    mapClick: (
      event: tt.MapMouseEvent<"click">,
      apiKey: string,
      map: tt.Map,
      destinationMarke: tt.Marker
    ) => void;
    addmarker: (
      map: tt.Map,
      popup: tt.Popup,
      position: [number, number]
    ) => tt.Marker;
  };
export type {markerProp, func}