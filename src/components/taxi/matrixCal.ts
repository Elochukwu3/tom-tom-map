function processMatrixResponse(result:any, drawAllRoute:VoidFunction) {
    const travelTimeInSecondsArray = []
    const lengthInMetersArray = []
    const trafficDelayInSecondsArray = []
    result.matrix.forEach(function (child:any) {
      travelTimeInSecondsArray.push(
        child[0].response.routeSummary.travelTimeInSeconds
      )
      lengthInMetersArray.push(child[0].response.routeSummary.lengthInMeters)
      trafficDelayInSecondsArray.push(
        child[0].routeSummary.response.trafficDelayInSeconds
      )
    })
    drawAllRoute()
}