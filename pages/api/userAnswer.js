import { PostData ,findValueUsingUerId} from "../../components/dataHandle/crud";

export default async function handle(req,res){

      // completed test 
      if(req.method==='POST')
      {
          const data=req.body;
          try {
              const result=await PostData(data,'answer');
              if(result.acknowledged){
                  res.status(200).json({message:result.acknowledged});
              }
              else res.status(201).json({message:0});
     
          } catch (error) {   
                res.status(201).json({message:error});
              }
      }
     
      if(req.method==='PUT')
      {
          const {resultId,collect}=req.body;
          try {
              const result=await findValueUsingUerId(resultId,collect);
             // console.log(result);
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