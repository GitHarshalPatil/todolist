import { Button, IconButton, List, ListItem, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, setSearchTerm, updateTodo } from '../redux/todoSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function TodoList() {
    const todos = useSelector((state) => state.todos.todos)
    const searchTerm = useSelector((state) => state.todos.searchTerm)
    const dispatch = useDispatch();
    const [input, setInput] = useState('')
    const [editId, setEditId] = useState(null)

    const handleAddorUpdate = () => {
        if (editId) {
            dispatch(updateTodo({
                id: editId,
                text: input
            }));
            setEditId(null)
        } else {
            dispatch(addTodo({ id: Date.now(), text: input }))
        }
        setInput('')

    }
    const handleEdit = (todo) => {
        setInput(todo.text)
        setEditId(todo.id)

    }
    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    }

    const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Search Todos"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                sx={{ marginBottom: 2 }}

            />
            <TextField
                id="outlined-basic"
                label="Add Todo"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{ marginBottom: 2 }}
                fullWidth
            />

            <Button variant="contained" onClick={handleAddorUpdate} >{editId ? "Update Todo" : "Add Todo"}</Button>

            <List>
                {filteredTodos.map((todo) =>
                    <ListItem key={todo.id}>
                        <ListItemText primary={todo.text} />
                        <IconButton onClick={() => handleEdit(todo)} color='primary'><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(todo.id)} color='error'><DeleteIcon /></IconButton>
                    </ListItem>
                )}
            </List>
        </div>
    )
}

export default TodoList
