
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

    export type {TMapContent}