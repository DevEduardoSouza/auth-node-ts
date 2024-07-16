import express from "express";
import routes from "./routes";
import connectDB from "./database/connection";

const app = express();

app.use(express.json());

// DB connection
connectDB();

// add routes
app.use(routes);

export default app;
