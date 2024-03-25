import { ObjectId } from "mongodb";
import {findSingleValueUsingId ,findValueUsingQuestionId} from "../../components/dataHandle/crud";
export default async function handle(req,res){

      // AFTER VALIDATE START TEST 
      if(req.method==='POST')
      {
          const id=new ObjectId(req.body);
          try {
              const result=await findSingleValueUsingId(id,'question');
              if(result){
                  res.status(200).json({message:result});
              }
             else {
                res.status(200).json({message:0});
            }    
          } catch (error) {  
                res.status(201).json({message:0});
              }
      }

      if(req.method==='PUT')
      {
          const {resultId,collect}=req.body;
          try {
              const result=await findValueUsingQuestionId(resultId,collect);
              if(result){
                  res.status(200).json({message:result});
              }
              else res.status(201).json({message:0});    
          } catch (error) {   
            console.log(error);
                res.status(201).json({message:0});
              }
      }
  
}