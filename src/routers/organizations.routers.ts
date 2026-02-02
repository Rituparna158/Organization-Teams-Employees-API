import { Router } from "express";

const router=Router();

interface Organization{
    id:number;
    name:string;
}
const organizations:Organization[]=[];

router.post("/",(req,res)=>{
    const {name}=req.body;

    const newOrg:Organization={
        id:organizations.length+1,
        name:name
    };
    organizations.push(newOrg);
    res.json(newOrg);
});

router.get("/",(req,res)=>{
    res.json(organizations);
});
router.get("/:id",(req,res)=>{
    const id=Number(req.params.id);
    const org=organizations.find(o=> o.id===id);
    if(!org){
        return res.status(404).json({message:"organisation not found"})
    }
    res.json(org)
})
export default router;