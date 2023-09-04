const apiKey = import.meta.env.VITE_API_MAP_KEY;
import { useState, useEffect, useRef } from "react";
// import useDebounce from "./hooks/useDbounce";
// const TOM_TOM_API_KEY = import.meta.env.VITE_API_MAP_KEY;
  import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import * as tt from "@tomtom-international/web-sdk-services";
const Search = () => {
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const searchBoxOptions = {
    idleTimePress: 30,
    minNumberOfCharacters: 3,
    searchOptions: {
      key: apiKey,
      language: "en-GB",
      limit: 20,
      idxSet: "POI",
      // limit: 20
    },
    autocompleteOptions: {
      key: apiKey,
      language: "en-GB",
      limit: 20,
      // resultSet: "brand"
    },
    noResultsMessage: "No results found.",
  };

  const ttSearchBox = new SearchBox(tt.services, searchBoxOptions);
  useEffect(() => {
    const searchBoxElement = ttSearchBox.getSearchBoxHTML();
    if (inputRef.current && searchBoxElement) {
      // inputRef.current.innerHTML = "";
      inputRef.current.appendChild(searchBoxElement);
    }else{
      setErr("Error")
    }

    return () => {
      ttSearchBox.onRemove();
    };
  }, [searchBoxOptions]);

const updateSearch = ()=>{
  let options = ttSearchBox.getValue()
  // options.options.boundingBox 
  // ttSearchBox.updateOptions(options)
}

  // tomtom.searchbox.resultselected
  // console.log(searchBoxHTML);

  // https://api.tomtom.com/search/2/search/${changedSearchText}.json?
  // https://api.tomtom.com/search/2/autocomplete/pizza.json?key={Your_API_Key}&language=en-US

  return (
    <div className="h-96 overflow-scroll cursor-grab rounded-md bg-zinc-500 z-50 md:w-1/2 w-9/12 flex justify-center flex-col items-center fixed right-10 bottom-0">
      {err && err}
      <div ref={inputRef} className="w-full h-full relative">
      </div>
    </div>
  );
};

export default Search;
