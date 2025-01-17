import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.MONGO_URI || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
