import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    searchTerm: ""
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id)
            state.todos[index] = action.payload;
            localStorage.setItem("todos", JSON.stringify(state.todos))

        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    }
})

export const { addTodo, updateTodo, deleteTodo, setSearchTerm } = todoSlice.actions;

export default todoSlice.reducer;