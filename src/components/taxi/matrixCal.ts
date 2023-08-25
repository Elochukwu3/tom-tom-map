import { taxiProp } from "./type";

function processMatrixResponse(
  result: any[],
  drawAllRoute: VoidFunction,
  taxiArray: taxiProp[],
  bestRouteIndex: number
) {
  // console.log(result);

  const travelTimeInSecondsArray: any = [];
  const lengthInMetersArray = [];
  const trafficDelayInSecondsArray = [];
  result.forEach(function (child: any) {
    // console.log(child.routeSummary.travelTimeInSeconds);

    travelTimeInSecondsArray.push(child.routeSummary.travelTimeInSeconds);
    lengthInMetersArray.push(child.routeSummary.lengthInMeters);
    trafficDelayInSecondsArray.push(child.routeSummary.trafficDelayInSeconds);
  });
  modifyFastestRouteColor(travelTimeInSecondsArray, taxiArray, bestRouteIndex);
  drawAllRoute();
}
function modifyFastestRouteColor(
  travelTimeInSecondsArray: [],
  taxiArray: taxiProp[],
  bestRouteIndex: number
) {
  const fastestRouteColor = "#800080";
  const sortedTab = travelTimeInSecondsArray.slice();
  sortedTab.sort(function (a, b) {
    return a - b;
  });
  bestRouteIndex = travelTimeInSecondsArray.indexOf(sortedTab[0]);
  taxiArray[bestRouteIndex].color = fastestRouteColor;
  // console.log(taxiArray[bestRouteIndex], "time to take",sortedTab[0]);
}

export default processMatrixResponse;
