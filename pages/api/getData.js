import { ObjectId } from "mongodb";
import {findSingleValueUsingId ,findQuestionIdUsingUserId} from "../../components/dataHandle/crud";

export default async function handle(req,res){
    
      if(req.method==='PUT')
      {    
        const {userId,collect}=req.body;
          try {     
              const id1=new ObjectId(userId);
              const result=await findSingleValueUsingId(id1,collect);
              if(result){
                  res.status(200).json({message:result});
              }
              else res.status(201).json({message:0});    
          } catch (error) {   
                 console.log('errors::'+error);
                res.status(201).json({message:0});
              }
      }

      if(req.method==='POST')
      {
          const {userId,collect}=req.body;
          try {
              const result=await findQuestionIdUsingUserId(userId,collect);
              if(result){
                  res.status(200).json({message:result});
              }
             else res.status(201).json({message:0});    
          } catch (error) {      
                res.status(201).json({message:error});
              }
              
      }
 

}