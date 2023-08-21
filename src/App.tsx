import { useState } from 'react';
import * as tt from "@tomtom-international/web-sdk-maps";
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <div className='bg-blue-400'>
        <h1 className='text-3xl font-extrabold capitalize break-words w-10/12'>lets build a map interface with TOMTOM</h1>
       </div>
    </>
  )
}

export default App
