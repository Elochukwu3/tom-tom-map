const apiKey = import.meta.env.VITE_API_MAP_KEY;
import { useState, useEffect, useRef } from "react";
// import useDebounce from "./hooks/useDbounce";
import * as tt from "@tomtom-international/web-sdk-maps";
  import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
  import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css"
  import { services } from "@tomtom-international/web-sdk-services";
  import {myMapProp } from "./type"
  const Search = ({myMap}:myMapProp ) => {
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

  const ttSearchBox = new SearchBox(services, searchBoxOptions);

  //   function getBounds(data:any ) {
  //   var btmRight
  //   var topLeft
  //   if (data.viewport) {
  //     btmRight = [
  //       data.viewport.btmRightPoint.lng,
  //       data.viewport.btmRightPoint.lat,
  //     ]
  //     topLeft = [data.viewport.topLeftPoint.lng, data.viewport.topLeftPoint.lat]
  //   }
  //   return [btmRight, topLeft]
  // }
  function getBounds(data: any): tt.LngLatBoundsLike | null {
  if (data.viewport) {
    const west = data.viewport.topLeftPoint.lng;
    const south = data.viewport.btmRightPoint.lat;
    const east = data.viewport.btmRightPoint.lng;
    const north = data.viewport.topLeftPoint.lat;

    return [west, south, east, north];
  }
  
  return null; // Return null if there is no valid data.viewport
}



  function fitToViewport(markerData:any) {
    console.log(markerData.viewport.topLeftPoint);
    console.log(markerData.viewport.btmRightPoint);
    
    if (!markerData || (markerData instanceof Array && !markerData.length)) {
      return
    }
    var bounds = new tt.LngLatBounds()
    if (markerData instanceof Array) {
      markerData.forEach(function (marker:any) {
      })
    } else {
      const markerBounds  = getBounds(markerData);
      if (Array.isArray(markerBounds) && markerBounds.length === 2) {
        bounds.extend(markerBounds);
      } else if (Array.isArray(markerBounds) && markerBounds.length === 4) {
        bounds.extend(markerBounds);
      }
    }
   myMap && myMap.fitBounds(bounds, { padding: 100, linear: true })
   
  }

  function handleResultSelection(event:any) {
    var result = event.data.result
    if (result.type === "category" || result.type === "brand") {
      return
    }
    fitToViewport(result)
    // const position = result.position
    // myMap?.setCenter([position.lng, position.lat])
  }
 const addControl = ()=>{
  myMap && myMap.addControl(ttSearchBox, "top-left")
}


useEffect(() => {
  const searchBoxElement = ttSearchBox.getSearchBoxHTML();
  if (inputRef.current && searchBoxElement) {
    // inputRef.current.innerHTML = "";
    inputRef.current.appendChild(searchBoxElement);
  }else{
    setErr("Error")
  }
  ttSearchBox.off("tomtom.searchbox.resultselected");
  ttSearchBox.on("tomtom.searchbox.resultselected", handleResultSelection);

  addControl()
  return () => {
    ttSearchBox.onRemove();
    ttSearchBox.off("tomtom.searchbox.resultselected")
  };
}, [searchBoxOptions]);
  return (
    <div className="">
      {err && err}
      <div ref={inputRef} className="w-full h-full relative">
      </div>
    </div>
  );
};

export default Search;
