import classes from './TodoForm.module.scss'

function TodoForm({ taskInputValue, setTaskInputValue, todosData, setTodosData }) {
    function addTodo() {
        if (!taskInputValue.trim()) { // '   ' -> '' -> false
            alert('Task title is empty!')
            return
        }

        const newTodos = [...todosData, taskInputValue.trim()] // '   Task 5  ' -> 'Task 5'
        localStorage.setItem('todos', JSON.stringify(newTodos))
        setTodosData(newTodos) // ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'New task']
        setTaskInputValue('')
    }

    function changeTaskInputValue(event) {
        setTaskInputValue(event.target.value)
    }

    return (
        <div className={classes.inputContainer}>
            <input value={taskInputValue} onChange={changeTaskInputValue} type="text" placeholder='New task title'/>
            <button onClick={addTodo}>Add</button>
        </div>
    )
}

export default TodoForm
