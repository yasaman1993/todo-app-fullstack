import { Router } from "express";
const router = Router();

// Beispiel-Todos
let todos = [
  { id: 1, task: "Einkaufen gehen", completed: false },
  { id: 2, task: "Hausaufgaben machen", completed: false },
  { id: 3, task: "React lernen", completed: false },
];

// GET: Todos lesen
router.get("/", (req, res) => {
  res.json(todos);
});

// POST: Ein neues Todo hinzufügen
router.post("/", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//delete
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

//patch
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todo.completed = completed; // Update the completed status
  res.json(todo);
});

export default router;
