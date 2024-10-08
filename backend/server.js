import express from "express";
import cors from "cors";
import todosRoutes from "./routes/todos.js";
import { logger } from "./middleware/loggerMiddleware.js";

const app = express();
const port = 3005;

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/api/todos", todosRoutes);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.message); 
  res.status(500).json({ message: "Something went wrong" });
});

// Default Route
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

