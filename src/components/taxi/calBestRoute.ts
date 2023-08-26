export function calculateBestRouteIndex(batchItems: any[]): number {
    let shortestDuration = Number.MAX_VALUE;
    let bestIndex = -1;
  
    batchItems.forEach((singleRoute, index) => {
      let routeDuration = singleRoute.toGeoJson();
      routeDuration =
        routeDuration.features[0].properties.summary.travelTimeInSeconds;
        
      if (routeDuration < shortestDuration) {
        shortestDuration = routeDuration;
        bestIndex = index;
      }
    });
  
    return bestIndex;
  }