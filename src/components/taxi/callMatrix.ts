import { buildDestinationsParameter } from "./buildDestination";
import { buildOriginsParameter } from "./buildOriginParams";
import * as ttService from "@tomtom-international/web-sdk-services";
import { taxiProp } from "./type";
import processMatrixResponse from "./matrixCal";

type returnTypeDestination = ReturnType<typeof buildDestinationsParameter>;
type returnTypeOrigin = ReturnType<typeof buildOriginsParameter>;

export async function callMatrix(
  apiKey: string,
  taxiArray: taxiProp[],
  passengerMarker: any,
  drawAllRoute: VoidFunction,
  bestRouteIndex: number
) {
  const origins: returnTypeOrigin = buildOriginsParameter(taxiArray);
  const destinations: returnTypeDestination =
    buildDestinationsParameter(passengerMarker);

  const requestData = {
    "origins": origins,
    "destinations": destinations
  };
  const postData = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(requestData),
  };
  if (apiKey) {
    const API_URL = `https://api.tomtom.com/routing/matrix/2?key=${apiKey}`;
    try {
      const response = await fetch(API_URL, postData);
      if (!response.ok) throw new Error("Network response was not ok");
     const result = response.json()
     console.log(response);
     
      
    } catch (error) {
        console.log(error);
        
    }
  }
}
