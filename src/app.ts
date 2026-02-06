import express from "express";
import authRoutes from "./routers/auth";
import userRoutes from "./routers/user";
import orgRoutes from "./routers/organizations";
import teamRoutes from "./routers/teams";
import empRoutes from "./routers/employee";
import teamMemRoutes from "./routers/team-member";
import { setSwagger } from "./swagger";

const app = express();
console.log("app.ts loaded");
app.use(express.json());
console.log("app swagger ");
setSwagger(app);

app.get("/", (req, res) => {
  res.send("API is running");
});
console.log("mounting auth routes");
app.use("/auth/v1", authRoutes);
app.use("/users/v1", userRoutes);

app.use("/api/v1/organizations", orgRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/employees", empRoutes);
app.use("/api/v1/teams", teamMemRoutes);
export default app;
