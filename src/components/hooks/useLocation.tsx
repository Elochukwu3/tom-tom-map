import { useState, useEffect } from "react";

const useLocation = (): object => {
  const [location, setLocation] = useState<object>({});

  useEffect(() => {
    const navigatorFunc = (): void => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        });
      } else {
        setLocation({ latitude: 6.5244, longitude: 3.3792 });
      }
    };
    navigatorFunc();

    return () => {
      navigatorFunc();
    };
  }, []);

  return location;
};

export default useLocation;
