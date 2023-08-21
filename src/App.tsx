import { useState } from "react";
import MapCont from "./components/MapCont";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div className="m-0 p-0 h-screen">
        <MapCont/>
      </div>
    </>
  );
}

export default App;
