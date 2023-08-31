const apiKey = import.meta.env.VITE_API_MAP_KEY;
import { useState, FormEvent, useEffect, useRef } from "react";
import useDebounce from "./hooks/useDbounce";
const TOM_TOM_API_KEY = import.meta.env.VITE_API_MAP_KEY;
const API_URL = `https://api.tomtom.com/search/2/autocomplete/pizza.json?key=${TOM_TOM_API_KEY}&language=en-US`;
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import { services } from "@tomtom-international/web-sdk-services";
const Search = () => {
  const [input, setInput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const debouncevalue = useDebounce(input);
  const inputRef = useRef<HTMLDivElement>(null);

  const options = {
    idleTimePress: 30,
    minNumberOfCharacters: 0,
    searchOptions: {
      key: apiKey,
      language: "en-GB",
    },
    autocompleteOptions: {
      key: apiKey,
      language: "en-GB",
    },
    noResultsMessage: "No results found.",
  };

  useEffect(() => {
    const ttSearchBox = new SearchBox(services, options);
    const searchBoxElement = ttSearchBox.getSearchBoxHTML();
    if (inputRef.current && searchBoxElement) {
      inputRef.current.innerHTML = "";
      inputRef.current.appendChild(searchBoxElement);
    }

    return () => {
      ttSearchBox.onRemove();
    };
  }, [options]);

  const onchange = async (e: any) => {
    setInput(e.target.value);
    if (debouncevalue.length > 3) {
      console.log(debouncevalue);

      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);

      try {
      } catch (error) {}
    } else {
      setErr("Add content");
    }
  };


  // tomtom.searchbox.resultselected
  // console.log(searchBoxHTML);

  // https://api.tomtom.com/search/2/search/${changedSearchText}.json?
  // https://api.tomtom.com/search/2/autocomplete/pizza.json?key={Your_API_Key}&language=en-US

  return (
    <div className="h-96 overflow-scroll cursor-grab    rounded-md bg-zinc-800 z-50 md:w-1/2 w-9/12 flex justify-center flex-col items-center fixed right-0 bottom-1/2">
      {/* <searchBoxHTML/> */}
      <div ref={inputRef} className=""></div>
    </div>
  );
};

export default Search;
