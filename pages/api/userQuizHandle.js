import { PostData,findValueUsingQuestionId } from "../../components/dataHandle/crud";
export default async function handle(req,res){

    if(req.method==='POST'){
        
        const Question=[];    
        const Answer=[];
        const Option=[];

        const Alldata=req.body;

        const len=Alldata.totalQuestion;
        const topicName=Alldata.topicName;
        const totalQuestion=Alldata.totalQuestion;
        const userId=Alldata.userId;
        const data=Alldata.data;
        const totalTime=Alldata.totalTime;
        let question;
        let option;
        let answer;

        for(let i=1;i<=len;i++){
            
             question='question'+i;  
             answer='answer'+i;

            Question.push(data[question])   

            for(let j=1;j<=4;j++){
                option='option'+i+j;   
                Option.push(data[option]);
                if(option===data[answer]){
                    Answer.push(data[option]);   
                }
            }
        }
        try {
            const result=await PostData({totalQuestion,userId,topicName,totalTime,Question,Answer,Option},'question');
            // console.log(result);
            if(result.acknowledged && result.matchedCount ){
                res.status(200).json({message:1});
            }
           else  res.status(201).json({message:0});
   
        } catch (error) {   
              res.status(201).json({message:error});
            }
    }
  
    
}