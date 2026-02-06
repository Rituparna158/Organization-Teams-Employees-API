import dotenv from "dotenv";
dotenv.config();
import app from "./app";
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("server started on port 3000");
});
