import express from "express";
import orgRoutes from "./routers/organizations.routers"

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
});

app.use("/api/organizations",orgRoutes);
export default app;