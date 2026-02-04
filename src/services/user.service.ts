import db from "../db/sqlite";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

const userService={
    async register(
        email:string,
        password:string,
        role:"user" | "admin"
    
    ):Promise<User>{
        const passwordHash=await bcrypt.hash(password,10);

        return new Promise((resolve,reject)=>{
            const sql=`INSERT INTO users (email,passwordHash,role)
            VALUES (?, ?, ?)`;

            db.run(sql,[email,passwordHash,role],function(err){
                if(err) reject(err);
                else{
                    db.get(
                        `SELECT * FROM users WHERE id=?`,
                        [this.lastID],
                        (err2,row)=>{
                            if(err2) reject(err2);
                            else resolve(row as User);
                        }
                    )
                }
            })
        })
    },
    findByEmail(email:string):Promise<User |null>{
        return new Promise((resolve,reject)=>{
            db.get(
                `SELECT * FROM users WHERE email=? AND isActive=1`,
                [email],
                (err,row)=>{
                    if(err) reject(err);
                    else resolve(row?(row as User):null);
                }
            )
        })
    }
}
export default userService;