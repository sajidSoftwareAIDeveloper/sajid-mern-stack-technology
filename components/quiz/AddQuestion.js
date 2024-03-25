
import {Input,PopUp} from "../user/Input";
import {Question} from "./Option";  
import Button from "../user/Button";
import {useContext, useState} from 'react'
import { CartContext } from "../store";
import classes from './addQuestion.module.css'

export default function AddQuestion(){
    const[topicName,setTopicName]=useState();
    const[totalTime,setTotalTime]=useState();
    const[wait,setWait]=useState(false);
    const[totalQ,setTotalQ]=useState([]);
    const [valid,setValid]=useState(true);
    const [ValidateAnswer,setValidateAnswer]=useState();
    const ctx=useContext(CartContext);
    const userId=ctx.userInformationGet.userId;
    
    async function QuestionHandle(event){    
        event.preventDefault();
        const fd=new FormData(event.target);   
        const data=Object.fromEntries(fd.entries());
        const totalQuestion=totalQ.length;
        let count=0;
        let answer;
        for(let i=1;i<=totalQuestion;i++){
          answer='answer'+i;
          if(data[answer]){
            count++;
          }
        }

    if(count===totalQuestion){
        const dataAll={data,topicName,totalQuestion,userId,totalTime}

        if(data){
           setWait(true);
           const res=await fetch('/api/userQuizHandle', {
            method:"POST",
            body:JSON.stringify(dataAll),
            headers: { "Content-Type": "application/json" },
          });
          const resData= await res.json();
          if(res.ok){
            //console.log("ok:"+resData.message);
            setValid(false);
          }else{
           // console.log("not ok"+resData.message);
           setWait(false);
          }
        }
      }
      else{
           setValidateAnswer(true);
      }

    }  

    function setQuestionData(data){
      const arr=[];
      let i=1;
        while(i<=data){
          arr.push(i);
          i++;
        }
      setTotalQ(arr);
    }
    
    return(
    <div className={classes.mainDiv}>
      { valid &&  

      <div>  
          <div>
             <label htmlFor="topicName">topic name </label>
             <input type="text" name="topicName"id="topicName" required 
                 onChange={event=>setTopicName(event.target.value)}
              />
            <PopUp label="total question" name="total_q" id="total_q" setTata={setQuestionData} />
            
            <label htmlFor="totalTime">adding time in minutes </label>
             <input type="text" name="totalTime"id="totalTime" required 
             placeholder="with in to complete"
                 onChange={event=>setTotalTime(event.target.value)}
              />
            
          </div>

         <div className={classes.form}>

          <form onSubmit={QuestionHandle}>
          { 
            totalQ && topicName && totalTime
            && (
              totalQ.map(index=>(  
                 <div> 
                    <Question  
                    name={"question"+index} 
                    aName={"answer"+index} 
                    oName={"option"+index }
                    id={"question"+index} 
                    label={'Q_'+index}/>
                 </div>
                ))
                
            )             
          } 
           { ValidateAnswer && <div> please select all answer </div>  }

          { 
          (totalQ && topicName && totalTime)
           &&       
          <div>
           { !wait ?
             <Button name="save"/> : <p>loading.....</p>}   
          </div>} 

        </form>
        </div>   
    </div> 
   }  
   {
     !valid && <h1> data adding successfully </h1>
   } 
  </div>
    )
}
