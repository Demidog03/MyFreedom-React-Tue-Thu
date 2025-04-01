import classes from './TodoItem.module.scss'

function TodoItem({ taskTitle, todosData, setTodosData, taskIndex }) {

    function deleteTask() {
        const newTodos = todosData.filter((_, index) => index !== taskIndex)
        localStorage.setItem('todos', JSON.stringify(newTodos))
        setTodosData(newTodos)
    }

    return (
        <div className={classes.todo}>
            <p>{taskTitle}</p>
            <button onClick={deleteTask}>Delete</button>
        </div>
    )
}

export default TodoItem
