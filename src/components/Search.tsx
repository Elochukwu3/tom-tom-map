const apiKey = import.meta.env.VITE_API_MAP_KEY;
import { useState, useEffect, useRef } from "react";
// import useDebounce from "./hooks/useDbounce";
// const TOM_TOM_API_KEY = import.meta.env.VITE_API_MAP_KEY;
  import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import { services } from "@tomtom-international/web-sdk-services";
const Search = () => {
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const options = {
    idleTimePress: 30,
    minNumberOfCharacters: 3,
    searchOptions: {
      key: apiKey,
      language: "en-GB",
      limit: 20,
      idxSet: "POI"
    },
    autocompleteOptions: {
      key: apiKey,
      language: "en-GB",
      // resultSet: "brand"
    },
    noResultsMessage: "No results found.",
  };

  useEffect(() => {
    const ttSearchBox = new SearchBox(services, options);
    const searchBoxElement = ttSearchBox.getSearchBoxHTML();
    if (inputRef.current && searchBoxElement) {
      inputRef.current.innerHTML = "";
      inputRef.current.appendChild(searchBoxElement);
    }else{
      setErr("Error")
    }

    return () => {
      ttSearchBox.onRemove();
    };
  }, [options]);



  // tomtom.searchbox.resultselected
  // console.log(searchBoxHTML);

  // https://api.tomtom.com/search/2/search/${changedSearchText}.json?
  // https://api.tomtom.com/search/2/autocomplete/pizza.json?key={Your_API_Key}&language=en-US

  return (
    <div className="h-96 overflow-scroll cursor-grab    rounded-md bg-zinc-800 z-50 md:w-1/2 w-9/12 flex justify-center flex-col items-center fixed right-0 bottom-1/2">
      {err && err}
      <div ref={inputRef} className="w-full relative"></div>
    </div>
  );
};

export default Search;
