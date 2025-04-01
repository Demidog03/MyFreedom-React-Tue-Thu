import { useState } from 'react'
import classes from './TodoPage.module.scss'
import TodoItem from '../components/TodoItem'

function TodoPage() {
    const [todosData, setTodosData] = useState(['Task 1', 'Task 2', 'Task 3', 'Task 4'])

    const todos = todosData.map((todo, index) => {
        return (
            <TodoItem
                todosData={todosData}
                setTodosData={setTodosData}
                taskIndex={index}
                key={index}
                taskTitle={todo}
            />
        )
    })

    function addTodo() {
        setTodosData([...todosData, 'New task']) // ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'New task']
    }

    return (
        <div className={classes.container}>
            <div className={classes.inputContainer}>
                <input type="text" placeholder='New task title'/>
                <button onClick={addTodo}>Add</button>
            </div>
            <div className={classes.todosContainer}>
                {todos}
            </div>
        </div>
    )
}

export default TodoPage
