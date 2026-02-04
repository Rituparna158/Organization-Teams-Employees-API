import express from "express";
import orgRoutes from "./routers/organizations.routers"
import teamRoutes from "./routers/teams.routers"
import empRoutes from "./routers/employee.router"
import teamMemRoutes from "./routers/teamMember.router"

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
});

app.use("/api/organizations",orgRoutes);
app.use("/api/teams",teamRoutes);
app.use("/api/employees",empRoutes)
app.use("/api/teams",teamMemRoutes)
export default app;