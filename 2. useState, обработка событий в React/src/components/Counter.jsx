function Counter({ num, setNum, text }) {
    function decreaseNumber() {
        setNum(num - 1)
    }

    return (
        <div>
            <h2>Counter: {num}</h2>
            <p>{text}</p>
            <button onClick={decreaseNumber}>Decrease number</button>
        </div>
    )
}

export default Counter
