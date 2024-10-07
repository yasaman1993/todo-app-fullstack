import express from "express";
import cors from "cors";
import todosRoutes from "./routes/todos.js";
import { logger } from "./middleware/loggerMiddleware.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger); 
app.use("/api/todos", todosRoutes);

// globale Fehlerbehandlung
app.use((err, req, res, next) => {
  console.error("error")
  res.status(500).json({message: 'Something went wrong'})
})

// default route
app.use((req, res) => {
  res.status(404).send("Not found");
})


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
