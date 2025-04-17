import { useState } from "react"

function TestPage() {
    const [counter, setCounter] = useState(0)

    function increaseCounter() {
        // setCounter(counter + 1) // 0 + 1 = 1
        // setCounter(counter + 1) // 0 + 1 = 1
        // setCounter(counter + 1) // 0 + 1 = 1

        setCounter((counter) => counter + 1) // 0 + 1 = 1
        setCounter((counter) => counter + 1) // 1 + 1 = 2
        setCounter((counter) => counter + 1) // 2 + 1 = 3
    }
    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={increaseCounter}>Increase</button>
        </div>
    )
}

export default TestPage
