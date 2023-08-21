import { useState } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import "./App.css";
import MapCont from "./components/MapCont";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div className="m-0 p-0 h-screen">
        {/* <h1 className="text-3xl font-extrabold capitalize break-words w-10/12">
          lets build a map interface with TOMTOM
        </h1> */}
        <MapCont/>
      </div>
    </>
  );
}

export default App;
