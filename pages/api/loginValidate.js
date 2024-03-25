
import { SearchEmailPassword } from "../../components/dataHandle/crud";

export default async function handle(req,res){
    
    if(req.method==='POST'){
        const data=req.body;  
        try {
            const result= await SearchEmailPassword(data,'userInformation');
            if(result){
                res.status(200).json({message:result});
            }
           else  res.status(201).json({message:0});
        } catch (error) {
            res.status(201).json({message:error});
        }
    }

}