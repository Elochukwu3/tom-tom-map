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
        myMap: tt.Map | null
    } 
    export type {TMapContent, myMapProp}