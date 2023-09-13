import { useState, useEffect } from "react";

type locator = "lat" | "long";
export type locationObject = Record<locator, number>;

const useLocation = (): locationObject => {
  const [location, setLocation] = useState<locationObject>({
    lat: 52.3676,
    long: 4.9041,
  });
const [err, setErr] = useState(false)
  useEffect(() => {
    const navigatorFunc = (): void => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setErr(false)
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, long: longitude });
            // console.log(position.coords);
          },
          (error) => {
            console.log(error, err);
            setErr(true)
          }
        );
      } else {
        setLocation({ lat: 52.3676, long: 4.9041});
      }
    };
    navigatorFunc();
  }, []);

  return location;
};

export default useLocation;
