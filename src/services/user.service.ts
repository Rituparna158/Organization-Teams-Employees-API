import db from "../db/sqlite";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

const userService={
    async register(
        email:string,
        password:string,
    
    ):Promise<User>{
        const passwordHash=await bcrypt.hash(password,10);

        return new Promise((resolve,reject)=>{
            const sql=`INSERT INTO users (email,passwordHash)
            VALUES (?, ?)`;

            db.run(sql,[email,passwordHash],function(err){
                if(err) reject(err);
                const userId=this.lastID;
                db.run(`
                    INSERT INTO user_roles (userId,roleId)
                    SELECT ?,id FROM roles WHERE name='user'
                    `,
                [userId],
                (err2)=>{
                    if(err2) return reject(err2);
                })
                db.get(
                    `SELECT id,email,isActive FROM users WHERE id=?`,
                        [userId],
                        (err3,row)=>{
                            if(err3) reject(err3);
                            else resolve(row as User);
                        }
                    )

            })
        })
    },
    findByEmail(email:string):Promise<User |null>{
        return new Promise((resolve,reject)=>{
            db.get(
                `SELECT * FROM users WHERE email=? AND isActive=1`,
                [email],
                (err,row)=>{
                    console.log("DB user row:",row)
                    if(err) reject(err);
                    else resolve(row?(row as User):null);
                }
            )
        })
    },
    updateMe(
        userId:number,
        email:string
    ):Promise<User|null>{
        return new Promise((resolve,reject)=>{
            const sql=`
            UPDATE users SET email=? WHERE id=? AND isActive=1`;
            db.run(sql,[email,userId],function(err){
                if(err) reject(err);
                if(this.changes===0) return resolve(null);
                db.get(
                    `SELECT id,email,isActive FROM users WHERE id=?`,
                        [userId],
                        (err2,row)=>{
                            if(err2) reject(err2);
                            else resolve(row as User);
                        }
                    )
            })
        })
    },
    async updatePassword(
        userId:number,
        newPassword:string
    ):Promise<boolean>{
        const passwordHash=await bcrypt.hash(newPassword,10);
        return new Promise((resolve,reject)=>{
            db.run(`
                UPDATE users SET passwordHash=? WHERE id=?`,
            [passwordHash,userId],
        function(err){
            if(err) reject(err);
            else resolve(this.changes>0);
        })

        })
    },
    deleteMe(
        userId:number
    ):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            db.run(`
                UPDATE users SET isActive=0 WHERE id=?`,
            [userId],
        function(err){
            if(err) reject(err);
            else resolve(this.changes>0);
        })
        })
    }
}
export default userService;