import * as tt from "@tomtom-international/web-sdk-maps";
import useTaxiCreatore from "./useTaxiCreatore";

const useRoutes = () => {
   const { setDefaultTaxiConfig} = useTaxiCreatore()
    let routes:[] = []

    function clear(map:tt.Map) {
        routes.forEach(function (child) {
          map.removeLayer(child[0])
          map.removeLayer(child[1])
          map.removeSource(child[0])
          map.removeSource(child[1])
        })
        routes = []
        setDefaultTaxiConfig()
        // passengerMarker.togglePopup()
      }
  return (
    <div>useRoutes</div>
  )
}

export default useRoutes