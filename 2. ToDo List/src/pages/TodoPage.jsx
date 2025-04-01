import { useState } from 'react'
import classes from './TodoPage.module.scss'
import TodoItem from '../components/TodoItem/TodoItem'
import TodoForm from '../components/TodoForm/TodoForm'

function TodoPage() {
    const [taskInputValue, setTaskInputValue] = useState('')
    const [todosData, setTodosData] = useState(JSON.parse(localStorage.getItem('todos')) || [])

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

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Todo app</h1>
            <TodoForm
                todosData={todosData}
                setTodosData={setTodosData}
                taskInputValue={taskInputValue}
                setTaskInputValue={setTaskInputValue}
            />
            <div className={classes.todosContainer}>
                {todos}
            </div>
        </div>
    )
}

export default TodoPage