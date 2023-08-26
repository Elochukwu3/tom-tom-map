import { buildDestinationsParameter } from "./buildDestination";
import { buildOriginsParameter } from "./buildOriginParams";
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
    origins: origins,
    destinations: destinations,
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
      const response:Response = await fetch(API_URL, postData);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const result = await response.json();
      result &&
        processMatrixResponse(
          result.data,
          drawAllRoute,
          taxiArray,
          bestRouteIndex
        );
    } catch (error) {
      console.log(error);
    }
  }
}
