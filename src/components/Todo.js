import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Todo = ({todos, removeTodo, editTodo }) => {
    return <>
        {todos.map((todo) => {
            const {id, title} = todo
            return(
                <div className="todo" key={id}>
                    <h3 className="todo-title">{title}</h3>
                    <div className="btn-container">
                        <button className="edit-btn" onClick={() => editTodo(id)} >
                            <FaEdit />
                        </button>
                        <button className="delete-btn" onClick={() => removeTodo(id)}>
                            <FaTrash />
                        </button>
                    </div>
                </div>
               
            )
        })}
    
    </>
}

export default Todo
