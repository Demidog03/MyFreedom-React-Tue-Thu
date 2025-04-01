import { useState } from "react"
import Counter from "./components/Counter"

function App() {
  const text = 'Hello'
  const [number, setNumber] = useState(0)

  function clickButton() {
    setNumber(number + 1)

    // setNumber(number + 1) // 0 + 1 = 1
    // setNumber(number + 1) // 0 + 1 = 1
    // setNumber(number + 1) // 0 + 1 = 1

    // setNumber(prev => prev + 1) // 0 + 1 = 1
    // setNumber(prev => prev + 1) // 1 + 1 = 2
    // setNumber(prev => prev + 1) // 2 + 1 = 3
  }

  return (
    <>
      <h1>Number: {number}</h1>
      <button onClick={clickButton}>Increase number</button>
      <Counter num={number} setNum={setNumber} text={text}/>  {/* props: {num: 0, setNum: f(), text: 'Hello'} */}
    </>
  )
}

export default App
