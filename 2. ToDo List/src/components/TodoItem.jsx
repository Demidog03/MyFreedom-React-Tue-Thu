import classes from './TodoItem.module.scss'

function TodoItem({ taskTitle, todosData, setTodosData, taskIndex }) {

    function deleteTask() {
        setTodosData(todosData.filter((_, index) => index !== taskIndex))
    }

    return (
        <div className={classes.todo}>
            <p>{taskTitle}</p>
            <button onClick={deleteTask}>Delete</button>
        </div>
    )
}

export default TodoItem
