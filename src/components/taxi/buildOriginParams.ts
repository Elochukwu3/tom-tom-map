import convertPoint from "./convertPoint";
import { pointType } from "./type";

export const buildOriginsParameter = (taxiArray: any[]): pointType[] => {
  const origins: pointType[] = [];
  taxiArray.forEach((taxi) => {
    console.log(taxi);

    origins.push(convertPoint(taxi.coordinates[1], taxi.coordinates[0]));
  });
  return origins;
};
