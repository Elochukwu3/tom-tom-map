import { taxiProp } from "./type";

function processMatrixResponse(
  result: any,
  drawAllRoute: VoidFunction,
  taxiArray: taxiProp[],
  bestRouteIndex: number
) {
  const travelTimeInSecondsArray: any = [];
  const lengthInMetersArray = [];
  const trafficDelayInSecondsArray = [];
  result.matrix.forEach(function (child: any) {
    travelTimeInSecondsArray.push(
      child[0].response.routeSummary.travelTimeInSeconds
    );
    lengthInMetersArray.push(child[0].response.routeSummary.lengthInMeters);
    trafficDelayInSecondsArray.push(
      child[0].routeSummary.response.trafficDelayInSeconds
    );
  });
  modifyFastestRouteColor(travelTimeInSecondsArray, taxiArray, bestRouteIndex);
  drawAllRoute();
}
function modifyFastestRouteColor(
  travelTimeInSecondsArray: [],
  taxiArray: taxiProp[],
  bestRouteIndex: number
) {
  const fastestRouteColor = "";
  const sortedTab = travelTimeInSecondsArray.slice();
  sortedTab.sort(function (a, b) {
    return a - b;
  });
  bestRouteIndex = travelTimeInSecondsArray.indexOf(sortedTab[0]);
  taxiArray[bestRouteIndex].color = fastestRouteColor;
}

export default processMatrixResponse