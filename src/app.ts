import express from "express";
import authRoutes from "./routers/auth.router"
import userRoutes from "./routers/user.router"
import orgRoutes from "./routers/organizations.routers"
import teamRoutes from "./routers/teams.routers"
import empRoutes from "./routers/employee.router"
import teamMemRoutes from "./routers/teamMember.router"

const app = express();
console.log("app.ts loaded");
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
});
console.log("mounting auth routes");
app.use("/auth",authRoutes);
app.use("/users",userRoutes);

app.use("/api/organizations",orgRoutes);
app.use("/api/teams",teamRoutes);
app.use("/api/employees",empRoutes)
app.use("/api/teams",teamMemRoutes)
export default app;