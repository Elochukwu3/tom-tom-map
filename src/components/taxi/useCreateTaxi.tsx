import { taxiProp } from "./type";

const useCreateTaxi = () => {
  const createTaxi = (
    name: string,
    color: string,
    coordinates: [number, number],
    iconFilePath: string,
    iconWidth = 11,
    iconHeight = 10
  ): taxiProp => {
    return {
      name: name,
      color: color,
      coordinates: coordinates,
      icon:
        "<img src=" +
        iconFilePath +
        " style='width: " +
        iconWidth +
        "px; height: " +
        iconHeight +
        "px;'>",
    };
  };
  return createTaxi;
};

export default useCreateTaxi;
