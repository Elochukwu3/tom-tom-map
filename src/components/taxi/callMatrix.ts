  import { buildDestinationsParameter } from "./buildDestination"
  import { buildOriginsParameter } from "./buildOriginParams";
  import * as ttService  from "@tomtom-international/web-sdk-services"
  import { taxiProp } from "./type";
  import processMatrixResponse from "./matrixCal";

 type returnTypeDestination = ReturnType<typeof buildDestinationsParameter>
 type returnTypeOrigin = ReturnType<typeof buildOriginsParameter>

  function callMatrix(apiKey:string, taxiArray:taxiProp[], passengerMarker: any, drawAllRoute: VoidFunction, bestRouteIndex: number) {
    const origins:returnTypeOrigin = buildOriginsParameter(taxiArray)
    const destinations:returnTypeDestination = buildDestinationsParameter(passengerMarker)
    
    ttService.services
      .matrixRouting({
        key: apiKey,
        origins: origins,
        destinations: (destinations as unknown)  as string[],
        traffic: true,
      })
      .then((result)=> (
        processMatrixResponse(result,drawAllRoute, taxiArray, bestRouteIndex)
      ))
  }