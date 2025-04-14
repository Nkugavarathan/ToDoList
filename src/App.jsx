import React, { useReducer, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

function reducer(todos, action) {
  switch (action.type) {
    case "add":
      return [...todos, { id: Date.now(), text: action.payload }]
    case "delete":
      return todos.filter((todo) => todo.id !== action.payload)
    case "move_up": {
      const idx = todos.findIndex((todo) => todo.id === action.payload)
      if (idx === 0) return todos
      const newTodos = [...todos]
      ;[newTodos[idx - 1], newTodos[idx]] = [newTodos[idx], newTodos[idx - 1]]
      return newTodos
    }
    case "move_down": {
      const idx = todos.findIndex((todo) => todo.id === action.payload)
      if (idx === todos.length - 1) return todos
      const newTodos = [...todos]
      ;[newTodos[idx + 1], newTodos[idx]] = [newTodos[idx], newTodos[idx + 1]]
      return newTodos
    }
    default:
      return todos
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [input, setInput] = useState("")

  const handleAdd = () => {
    if (input.trim() !== "") {
      dispatch({ type: "add", payload: input })
      setInput("")
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📝 My Todo List</h2>

      <div className="input-group mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a todo..."
          className="form-control"
        />
        <button onClick={handleAdd} className="btn btn-primary">
          Add
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{todo.text}</span>
            <div className="btn-group">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => dispatch({ type: "move_up", payload: todo.id })}
              >
                ⬆️
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() =>
                  dispatch({ type: "move_down", payload: todo.id })
                }
              >
                ⬇️
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch({ type: "delete", payload: todo.id })}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
