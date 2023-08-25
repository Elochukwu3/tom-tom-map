type taxiProp = {
  name: string;
  color: string;
  coordinates: [number, number];
  icon: string;
};

type pointType = {
  point: {
    latitude: number;
    longitude: number;
  };
};
export type { taxiProp, pointType };
