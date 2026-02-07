import dotenv from "dotenv";
dotenv.config();
import app from "./app";
const port = Number(process.env.port) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("server started on port 3000");
});
