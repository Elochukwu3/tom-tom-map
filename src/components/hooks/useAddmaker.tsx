import * as tt from "@tomtom-international/web-sdk-maps";

type markerProp = {
    setLong: React.Dispatch<React.SetStateAction<number>>,
    setLat: React.Dispatch<React.SetStateAction<number>>,
   
}

const useAddmaker = ({setLong, setLat}: markerProp) => {
    const addmarker = ():void=>{
  const element:HTMLElement = document.createElement("div")
    element.className = 'h-10 w-10 bg-red-900 marker';

    const marker = new tt.Marker({
        draggable: true,
        element: element
    })
    marker.on("dragend", ():void=>{
        const LngLat:tt.LngLat  = marker.getLngLat()
        setLong(LngLat.lng)
        setLat(LngLat.lat)
        console.log(LngLat, element) ;
        
    })
    console.log(element, marker);
    }
    
  return {addmarker}
}

export default useAddmaker