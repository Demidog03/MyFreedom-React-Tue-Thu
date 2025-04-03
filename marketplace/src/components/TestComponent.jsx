import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"

function TestComponent() {
    const [number, setNumber] = useState(0)
    const [number2, setNumber2] = useState(0)

    // useEffect(() => {
    //     console.log('USE EFFECT')
    // }) // будет работать при ПЕРВОМ РЕНДЕРЕ (MOUNT) и при любых ре-рендерах

    // useEffect(() => {
    //     console.log('USE EFFECT')
    // }, []) // будет раборать только при ПЕРВОМ РЕНДЕРЕ (MOUNT)

    // useEffect(() => {
    //     console.log('USE EFFECT')
    // }, [number]) // будет работать при ПЕРВОМ РЕНДЕРЕ и при ре-рендерах из за состояние number

    useEffect(() => {
        return () => {

        }
    }, []) // Будет работать при удалении компонента (unmount)

    function increaseNumber() {
        setNumber(number + 1)
    }

    function increaseNumber2() {
        setNumber2(number2 + 1)
    }

    return (
        <>
            <h1>Number: {number}</h1>
            <Button onClick={increaseNumber}>Increase number</Button>
            <h1>Number-2: {number2}</h1>
            <Button onClick={increaseNumber2}>Increase number 2</Button>
        </>
    )
}

export default TestComponent
