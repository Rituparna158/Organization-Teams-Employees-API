import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.db_host,
  port: Number(process.env.db_port),
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
});
export default pool;
