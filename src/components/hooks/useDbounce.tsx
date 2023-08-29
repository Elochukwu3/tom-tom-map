import { useState, useEffect } from "react";

const useDebounce = (searchValue: string, delay = 1500) => {
  const [debounced, setDebounced] = useState(searchValue);
  useEffect(() => {
    const interval = setTimeout(() => setDebounced(searchValue), delay);
    return () => {
      clearInterval(interval);
    };
  }, [debounced, delay]);

  return debounced;
};

export default useDebounce