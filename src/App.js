import Todo from './components/Todo'
import Alert from './components/Alert'
import { useEffect, useState } from 'react'

const todos = JSON.parse(localStorage.getItem('todoItems'))

const App = () => {

    const [name, setName] = useState('')
    const [alert, setAlert] = useState({show: false, type: '', msg: ''}
    )
    const [todoItem, setTodoItem] = useState(todos)
    const [editId, setEditId] = useState(null)
    const [edit, setIsEditing] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name) {
            showAlert(true, 'danger', 'please add a value')
        } else if(name && edit) {
            setTodoItem(todoItem.map((todo) => {
                if(todo.id === editId) {
                    return {...todo, title: name}
                }
                return todo
            }))
            setEditId(null)
            setIsEditing(false)
            showAlert(true,'success','item edited successfully')
            setName('')           
        } else {
            const todo = {id: new Date().getTime().toString(), title: name}
            setTodoItem([...todoItem, todo])
            showAlert(true, 'success',`"${name}" added to Todo-list`)
            setName('')
            
        }
    }


    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({show,type,msg})
    }

    const removeAlert = () => {
        showAlert(false)
    }

    const editTodo = (id) => {
        setIsEditing(true)
        const editedTodo = todoItem.find((todo) => todo.id === id)
        setEditId(id)
        setName(editedTodo.title)
    }


    const removeTodo = (id) => {
        const removedItem = todoItem.find((todo) => todo.id === id)
        console.log(removedItem);
        showAlert(true, 'success', `"${removedItem.title}" removed from list`)
        setTodoItem(todoItem.filter((todo) => todo.id !== id))
    }

    useEffect(() => {
        localStorage.setItem('todoItems', JSON.stringify(todoItem))
    },[todoItem])

    return <section className="section-center">
        <div className="title">
            <h3>Todo list</h3>
            <div className="underline"></div>
        </div>
        {alert.show && <Alert {...alert} removeAlert={removeAlert} />}
        <form action="" className="todo-form" onSubmit={handleSubmit}>
            <div className="form-control">
                <input type="text" className="todo-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                 />
            </div>
            <button type="submit" className='submit-btn'>
                {edit ? 'edit' : 'submit'}
            </button>
        </form>
        { todoItem.length > 0 &&
        
        <>
        <Todo todos={todoItem} removeTodo={removeTodo} editTodo={editTodo} />
        <button className="clear-items" onClick={() => setTodoItem([])}>clear todos</button>
        </>
        }
    </section>
}

export default App