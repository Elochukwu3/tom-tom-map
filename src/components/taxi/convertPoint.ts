import { pointType } from "./type";
const convertPoint = (lat: number, long: number): pointType => {
  return {
    point: {
      latitude: lat,
      longitude: long,
    },
  };
};

export default convertPoint