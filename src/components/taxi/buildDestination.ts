//   function buildDestinationsParameter() {
//     return [
//       convertToPoint(
//         passengerMarker.getLngLat().lat,
//         passengerMarker.getLngLat().lng
//       ),
//     ]

import convertPoint from "./convertPoint"

const buildDestinationsParameter = (passengerMarker: any)=>{
    return [
        convertPoint(
            passengerMarker.getLngLat().lat,
            passengerMarker.getLngLat().lng,
        )
    ]
}