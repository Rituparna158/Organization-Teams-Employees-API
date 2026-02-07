import express from "express";
import authRoutes from "./routers/auth.router";
import userRoutes from "./routers/user.router";
import orgRoutes from "./routers/organizations.routers";
import teamRoutes from "./routers/teams.routers";
import empRoutes from "./routers/employee.router";
import teamMemRoutes from "./routers/teamMember.router";

const app = express();
console.log("app.ts loaded");
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("API is running");
});
console.log("mounting auth routes");
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.use("/api/v1/organizations", orgRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/employees", empRoutes);
app.use("/api/v1/teams", teamMemRoutes);
export default app;
