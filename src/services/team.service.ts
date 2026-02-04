import { resolve } from "node:dns";
import db from "../db/sqlite";
import { Teams } from "../models/teams.model";

const teamService={
    create(name:string,organizationId:number):Promise<Teams>{
        return new Promise((resolve,reject)=>{
            const sql="INSERT INTO teams (name , organizationId) VALUES (?,?)";
            db.run(sql,[name,organizationId],function(err){
                if(err){
                    reject(err)
                }else{
                    db.get(
                        `SELECT * FROM teams WHERE id=?`,
                        [this.lastID],
                        (err2,row)=>{
                            if(err2) reject(err2);
                            else resolve(row as Teams)
                        }
                    )
                }
            })
        })
    },
    getAll():Promise<Teams[]>{
        return new Promise((resolve,reject)=>{
            const sql="SELECT * FROM teams";
            db.all(sql,[],(err,rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows as Teams[])
                }
            })
        })
    },
    getById(id:number):Promise<Teams|null>{
        return new Promise((resolve,reject)=>{
            const sql="SELECT * FROM organizations WHERE id=?"

            db.get(sql,[id],(err,row)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(row? (row as Teams):null)
                }
            })
        })
    },
    getByOrganizationId(organizationId:number):Promise<Teams[]>{
        return new Promise((resolve,reject)=>{
            const sql="SELECT * FROM organizations WHERE organizationId=?";
            db.all(sql,[organizationId],(err,row)=>{
                if(err){
                    reject(err)
                }else{
                    resolve (row as Teams[])
                }
            })
        })
    },
    update(id:number,name:string):Promise<Teams|null>{
        return new Promise((resolve,reject)=>{
            db.run(
                `UPDATE teams SET name=? WHERE id=?`,
                [name,id],
                function(err){
                    if(err) reject(err);
                    else {
                        db.get(`SELECT * FROM teams WHERE id =?`,
                            [id],
                            (e,row)=>{
                                if(e) reject(e);
                                else resolve(row? (row as Teams):null)
                            }
                        )
                    }
                }
            )
        })
    },
    deleteById(id:number):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            const sql=`DELETE FROM teams WHERE id=?`
            db.run(sql,[id],function(err){
                if(err) reject(err);
                else resolve(this.changes>0);

            })
        })
    },
    deleteAll():Promise<number>{
        return new Promise((resolve,reject)=>{
            db.run(`DELETE FROM teams`,
                function(err){
                    if(err) reject(err);
                    else resolve(this.changes);
                }
            )
        })
    }
}
export default teamService;