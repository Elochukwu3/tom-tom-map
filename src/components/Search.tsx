const apiKey = import.meta.env.VITE_API_MAP_KEY;
import { useState, useEffect, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";
import { services } from "@tomtom-international/web-sdk-services";
import { myMapProp } from "./type";
import useAddmaker from "./hooks/useAddmaker";
import drawRouteOnSearch from "./searchRoute";
import useLocation from "./hooks/useLocation";

const Search = ({
  myMap,
  setDragedLngLat,
  destinationMarker,
  setDestinationMarker,
}: myMapProp) => {
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const { addmarker } = useAddmaker({ setDragedLngLat });
  const location = useLocation();

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
    },
    noResultsMessage: "No results found.",
  };

  const ttSearchBox = new SearchBox(services, searchBoxOptions);

  function getBounds(data: any): tt.LngLatBoundsLike | null {
    if (data.viewport) {
      const west = data.viewport.topLeftPoint.lng;
      const south = data.viewport.btmRightPoint.lat;
      const east = data.viewport.btmRightPoint.lng;
      const north = data.viewport.topLeftPoint.lat;

      return [west, south, east, north];
    }

    return null;
  }

  function fitToViewport(markerData: any) {
 

    if (!markerData || (markerData instanceof Array && !markerData.length)) {
      return;
    }
    var bounds = new tt.LngLatBounds();
    if (markerData instanceof Array) {
      markerData.forEach(function (marker: any) {
        getBounds(marker);
      });
    } else {
      const markerBounds = getBounds(markerData);
      if (Array.isArray(markerBounds) && markerBounds.length === 2) {
        bounds.extend(markerBounds);
      } else if (Array.isArray(markerBounds) && markerBounds.length === 4) {
        bounds.extend(markerBounds);
      }
    }
    myMap && myMap.fitBounds(bounds, { padding: 100, linear: true });
  }

  function handleResultSelection(event: any) {
    console.log("selecteddd");
    var result = event.data.result;
    if (result.type === "category" || result.type === "brand") {
      return;
    }
   
    const position = result.position;
    setDragedLngLat([position.lng, position.lat]);

    if (destinationMarker && myMap) {
      destinationMarker.setLngLat(position);
      console.log("marker existed");
      setDestinationMarker(destinationMarker);
    } else {
      const newDestinationMarker = addmarker(
        myMap!,
        new tt.Popup({ offset: [0, -30] }).setHTML(
          "click on any part of the map"
        ),
        [position.lng, position.lat]
      );
      setDestinationMarker(newDestinationMarker);
      console.log("new marker");
    }
    myMap &&
      drawRouteOnSearch(
        apiKey,
        myMap,
        [position.lng, position.lat],
        [location.lat, location.lat]
      );
      fitToViewport(result);
  }
  const addControl = () => {
    myMap && myMap.addControl(ttSearchBox, "top-left");
  };

  useEffect(() => {
    const searchBoxElement = ttSearchBox.getSearchBoxHTML();
    if (inputRef.current && searchBoxElement) {
      // inputRef.current.innerHTML = "";
      inputRef.current.appendChild(searchBoxElement);
    } else {
      setErr("Error");
    }
    ttSearchBox.off("tomtom.searchbox.resultselected");
    ttSearchBox.on("tomtom.searchbox.resultselected", handleResultSelection);

    addControl();
    return () => {
      ttSearchBox.onRemove();
      ttSearchBox.off("tomtom.searchbox.resultselected");
    };
  }, [searchBoxOptions]);
  return (
    <div className="">
      {err && err}
      <div ref={inputRef} className="w-full h-full relative"></div>
    </div>
  );
};

export default Search;
