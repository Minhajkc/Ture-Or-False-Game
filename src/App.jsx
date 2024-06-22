import { useState } from 'react'
import Qstns from './assets/Qstns'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Qstns/>
    </>
  )
}

export default App
