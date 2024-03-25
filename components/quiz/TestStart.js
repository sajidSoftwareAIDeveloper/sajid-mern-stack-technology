import { useContext, useRef, useState } from "react";
import {CartContext}  from '../store'
import Button from "../user/Button";
import { Answer, Question } from "./Option";
import { useRouter } from 'next/router';
import classes from './testStart.module.css' 

export default function StartTest(){
     
    const[valid,setValid]=useState(false);
    const[valid1,setValid1]=useState(false);
    const [allData,setAllData]=useState([]);
    const[timer,setTimer]=useState();
    const [timer1,setTimer1]=useState(0);
    const[wait,setWait]=useState(false);
    const[questionId,setQuestionId]=useState();
    const ctx=useContext(CartContext);
    const userId=ctx.userInformationGet.userId;
    const router=useRouter();
    const refId=useRef();


    async function validateHandle(){
        const data=refId.current.value;

        if (data){
        const res=await fetch('/api/userExcessQuiz',{
            method:"POST",
            body:JSON.stringify(data),
            headers:{"Content-Type":"application/json"},     
        });
        const eData=await res.json();    
        if(res.ok){ 
            if(eData.message){ 
                setAllData(eData.message) 
                setValid(true); 
                setValid1(false); 
                setQuestionId(data);
             //   timingHandle(eData.message.totalTime); 
            }
            else {setValid1(true); }
        }  
        else setValid(false); 
      } setValid1(true);
    }


   // answer handle ;
   async function AnswerHandle(event){  

     event.preventDefault();
     setWait(true); 
    const fd=new FormData(event.target);
    const data=Object.fromEntries(fd.entries());
    let count=0;
    const date1=new Date();
    const date=date1.getDate() +"/"+(date1.getMonth()+1)+"/"+ date1.getFullYear();

    for(let i=0;i<allData.totalQuestion;i++){
        if(data["answer"+i]===allData.Answer[i]){
            count++;
        }
    }
    const topicName=allData.topicName;
    const userName=ctx.userInformationGet.userName;
    const score=((count/allData.totalQuestion)*100).toFixed(2);
    const res=await fetch('/api/userAnswer',{
        method:"POST",
        body:JSON.stringify({userId,questionId,topicName,userName,score,date}),
        headers:{"Content-Type":"application/json"},
    });
    const data11=await res.json();
    if(res.ok){
       // quiz complete send done and show his score 
       if(data11.message){
             router.replace("/components1/complete?score="+score);
         } else setWait(false);
       } 
   } 

    function timingHandle(time){
        // iteration of the timing 
        setTimer(time-1)
      const t1= setInterval(() => {
            console.log(timer1);
              (timer1==60)?
              setTimer1(0):
              setTimer1(timer1+1);
        },1000);
        setInterval(() => {
            setTimer(timer-1);
            if(timer===0){
              //  AnswerHandle();
                clearTimeout(t1);
                clearTimeout();
                console.log('ok');
            }
        }, 1000*60);
        
    }


    return(
    <div className={classes.main}>
       { !valid &&
        <div>
               <label htmlFor="QuestionId">userId:</label>
               <input type="text" id="QuestionId" name="QuestionId" ref={refId} className={classes.id} />
               <button onClick={validateHandle}><Button name="next"/></button>
        </div>
       }

       {  valid1 && !valid&&<div> please inter valid userId </div>}

       {
        allData && valid && false && <h1>{timer}::{timer1}</h1>
       }
           
        <form onSubmit={AnswerHandle}>
            <div className={classes.form} >
            {   
              allData && valid
              &&(
               allData.Question.map((value,index)=>
                <Answer 
                    name="answer"
                    index={index}
                    valueQ={value}
                    valueO={allData.Option}
                />
                )  
              )
              }
              { (allData && valid ) &&<div>{
               !wait? <Button name="submit"/>:<p>loading.....</p> }
               </div>}
            </div>             
        </form>    

    </div>); 
}
