import { PostData,validateUniqueEmail } from "../../components/dataHandle/crud";

export default async function handle(req,res){
    
    if(req.method==='POST'){
        const data=req.body;
        try {

            const emailUnique=await validateUniqueEmail(data.email,'userInformation');
            if(!emailUnique){
                const result= await PostData(data,'userInformation');
                if(result.acknowledged){
                    res.status(200).json({message:1});
                }
                 else res.status(201).json({message:0});
            }
            else res.status(201).json({message:0});
            
        } catch (error) {
            res.status(201).json({message:error});
        }
    }
}