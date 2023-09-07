import * as tt from "@tomtom-international/web-sdk-maps";
type TMapContent = {
        key : string,
        container: HTMLElement | string,
        zoom: number,
        center:[number, number],
        stylesVisibility: {
            trafficIncidents: boolean,
            trafficFlow: boolean,
          };
    }

    type myMapProp = {
        myMap: tt.Map | null,
        setDragedLngLat: React.Dispatch<React.SetStateAction<object>>,
        destinationMarker: tt.Marker | null,
        setDestinationMarker: React.Dispatch<React.SetStateAction<tt.Marker | null>>
    } 
    export type {TMapContent, myMapProp}