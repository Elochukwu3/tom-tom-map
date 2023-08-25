import convertPoint from "./convertPoint";

export const buildDestinationsParameter = (passengerMarker: any)=>{
    return [
        convertPoint(
            passengerMarker.getLngLat().lat,
            passengerMarker.getLngLat().lng,
        )
    ]
}