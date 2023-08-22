import { useState, useEffect } from "react";

type locator = "lat" | "long";
export type locationObject = Record<locator, number>;

const useLocation = (): locationObject => {
  const [location, setLocation] = useState<locationObject>({
    lat: 6.5244,
    long: 3.3792,
  });

  useEffect(() => {
    const navigatorFunc = (): void => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, long: longitude });
            console.log(position.coords);
          },
          (error) => {
            console.log(error);
          }
        );
      } 
    };
    navigatorFunc();


  }, []);

  return location;
};

export default useLocation;