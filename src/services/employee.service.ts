import db from "../db/sqlite";
import { Employee } from "../models/employee.model";

const employeeeService={
    create(name:string,
        email:string,
        phone:number,
        designation:string|null,
        oganizationId:number
    ):Promise<Employee>{
        return new Promise((resolve,reject)=>{
            const sql=`INSERT INTO employees (name,email,phone,designation,organizationId)
             VALUES (?, ?, ?, ?, ?)`;
             db.run(sql,[name,email,phone,designation,oganizationId],
                function(err){
                    if(err) reject(err)
                    else {
                db.get(`SELECT * FROM employees WHERE id=?`,
                    [this.lastID],
                    (e,row)=>{
                        if(e) reject(e)
                        else resolve(row as Employee)
                    }
                )}
                }
             )
})
    },
    getById(id:number):Promise<Employee|null>{
        return new Promise((resolve,reject)=>{
            db.get(
                `SELECT * FROM employees WHERE id=? AND isActive=1`,
                [id],
                (err,row)=>{
                    if(err) reject(err)
                    else resolve(row? (row as Employee):null);
                }
            )

        })
    },
    getAll():Promise<Employee[]>{
        return new Promise((resolve,reject)=>{
            db.all(
                `SELECT * FROM employees WHERE isActive=1`,
                [],
                (err,rows)=>{
                    if(err) reject(err)
                    else resolve(rows as Employee[]);
                }
            )
        })
    },
    getAllByOrganization(organizationId:number):Promise<Employee[]>{
        return new Promise((resolve,reject)=>{
            db.all(
                `SELECT * FROM employees WHERE organizationId=? AND isActive=1`,
                [organizationId],
                (err,rows)=>{
                    if(err) reject(err);
                    else resolve(rows as Employee[]);
                }
            )

        })
    },
    update(id:number,
        phone:string|null,
        designation:string|null
    ):Promise<Employee|null>{
        return new Promise((resolve,reject)=>{
            const sql=
            `UPDATE employees
            SET phone=?,designation=?,updatedAt=CURRENT_TIMESTAMP
            WHERE id=? AND isActive=1`;
            db.run(sql,[phone,designation,id],(err)=>{
                if(err) reject(err)
                else{
            db.get(
                `SELECT * FROM employees WHERE id=?`,
                [id],

                (e,row)=>{
                    if(e) reject(e);
                    else resolve(row? (row as Employee):null);

                }
            )}
            })
        })
    },
    deleteById(id:number):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            const sql=`
            UPDATE employees SET isActive=0 WHERE id=?`;
            db.run(sql,[id],
            function(err){
                if(err) reject(err);
                else resolve(this.changes>0)
            }
        )
    })
    },
    deleteAll():Promise<number>{
        return new Promise((resolve,reject)=>{
            const sql=`UPDATE employees
            SET isActive=0
            WHERE isActive=1`;

            db.run(sql,function(err){
                if(err){
                    reject(err)
                }else{
                    resolve(this.changes)
                }
            })
        })
    }
}
export default employeeeService;
