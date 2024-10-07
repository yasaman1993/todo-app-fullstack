import { useState, useEffect } from "react";
import "./App.css"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

 
  useEffect(() => {
    fetch("http://localhost:3000/api/todos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Todos");
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Todos:", error);
      });
  }, []);

  // Add a new Todo
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTodo, completed: false }), // Ensure completed is set to false
      })
        .then((res) => res.json())
        .then((data) => {
          setTodos([...todos, data]); // Add the new Todo to the local list
          setNewTodo(""); // Reset input field
        })
        .catch((error) => {
          console.error("Fehler beim Hinzufügen des Todos:", error);
        });
    }
  };

  // Delete a Todo
  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id)); 
      })
      .catch((error) => console.error("Fehler beim Löschen des Todos:", error));
  };

  // Toggle completion status of a Todo
  const toggleCompleteTodo = (id) => {
    // Find the Todo to toggle
    const todoToUpdate = todos.find((todo) => todo.id === id);

    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todoToUpdate.completed }), // Toggle completed status
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        // Update local state with the newly updated Todo
        setTodos(
          todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        );
      })
      .catch((error) =>
        console.error("Fehler beim Aktualisieren des Todos:", error)
      );
  };

  return (
    <div className="app-container">
      <h1 className="app-title">TO DO LIST</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="todo-input"
        />
        <button type="button" onClick={handleAddTodo} className="add-button">
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((item) => (
          <li key={item.id} className="todo-item">
            <span className={`todo-text ${item.completed ? "completed" : ""}`}>
              {item.task}
            </span>
            <button
              onClick={() => toggleCompleteTodo(item.id)}
              className="toggle-button">
              {item.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => handleDeleteTodo(item.id)}
              className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
