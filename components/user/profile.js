import { useContext, useRef, useState } from 'react';
import classes from './profile.module.css'
import { CartContext } from '../store';
import Button from './Button';

 export default function Profile(){

   const ctx=useContext(CartContext);
   const userId=ctx.userInformationGet.userId;
   const [valid,SetValid]=useState(false);
   const [valid1,SetValid1]=useState(false);
   const [valid2,SetValid2]=useState(false);
   const [data,setData]=useState();
   const [dataSelf,setDataSelf]=useState([]); 
   const [dataProvide,setDataProvide]=useState([]);   
   const [showQuestion,setShowQuestion]=useState([]);
   const refId=useRef();
   const[validOption,setValidOption]=useState(false);
    
 // find question userId 
    async function showQuestionId(){
      const res=await fetch('/api/getData',{
        method:"POST",
        body:JSON.stringify({userId,collect:'question'}),   
        headers:{"Content-Type":"application/json"},
     });
      const resData= await res.json(); 
      if(res.ok){
        if(resData.message){
          setShowQuestion(resData.message);
          setValidOption(true);
        }
      }
    }
  
    // find profile data using id
   async function handleProfile(){
     //event.preventDefault();
    const res=await fetch('/api/getData',{
       method:"PUT",
       body:JSON.stringify({userId,collect:"userInformation" }),   
       headers: { "Content-Type": "application/json" },
    });
     const resData= await res.json(); 
     if(res.ok){
      if(resData.message){setData(resData.message)};
     }
  }
 
  // find self attained  answer result using userId  
  async function handleSelfResult(){
  
    const res=await fetch('/api/userAnswer',{
       method:"PUT",
       body:JSON.stringify({resultId:userId,collect:'answer'}),   
       headers:{"Content-Type":"application/json"},
    });
     const resData= await res.json(); 
     if(res.ok){
      if(resData.message){
      setDataSelf(resData.message);
      SetValid(true);
      SetValid1(false);
      }else{ SetValid2(true); }
     }
  }

  // find provide question result using questionId 
  async function handleProvideResult(){
  
    const questionId=refId.current.value;
    console.log(questionId);
    if(questionId){
      const res=await fetch('/api/userExcessQuiz',{
        method:"PUT",
        body:JSON.stringify({resultId:questionId,collect:'answer'}),   
        headers:{"Content-Type":"application/json"},
     });

      const resData= await res.json(); 
      if(res.ok){
       setDataProvide(resData.message);
       SetValid1(true);
       SetValid(false);
      }
    }
  }

  return(
    <div className={classes.main}>  

        { data && 
          <div>
            <h2>name:{data.name}</h2>
            <h2>email:{data.email}</h2>
            <h2>password:{data.password}</h2>
            <h2>phone :{data.phone }</h2>
          </div>
        }
        <div>
         { !data &&  <button onClick={handleProfile}><Button name="userDetails"/></button>}
          <button onClick={handleSelfResult}><Button name="self result"/></button>
          <button onClick={showQuestionId}><Button name="provide Result" /></button> <br/>

          <label htmlFor="select question"></label>
          { showQuestion && validOption &&
          <select id='select' onChange={handleProvideResult} ref={refId} className={classes.select}>
            <option  selected> select</option>
            {
              showQuestion.map(items=>
                <option value={items._id}>
                  <div className={classes.option}>
                    <label  > {items.topicName}:<pre>    </pre></label>
                    <label >{items._id}</label>
                  </div>
                </option>
              )
            }
          </select>
          }
          {!showQuestion && <p> until question not added </p>}

        </div>

        { dataSelf && valid &&
        <div>  
          <table border={3}>  
            <tr className={classes.tr}>
              <th className={classes.th} >topic name </th>
              <th className={classes.th}>score </th>
              <th className={classes.th}> date</th>
            </tr> 

            {dataSelf.map(items=>
              <tr>
                <td className={classes.td} >{items.topicName}</td>
                <td className={classes.td} >{items.score}</td>
                <td className={classes.td} >{items.date}</td>
              </tr>
            )
            }
          </table>
        </div>
       }
         
         {valid2 &&  <p> until question not added </p>}

       { dataProvide && valid1 &&
        <div>
          <table border={3}>
            <tr lassName={classes.tr}>
              <th className={classes.th} >userName </th>
              <th className={classes.th} >score </th>
              <th className={classes.th} >date</th>
            </tr>
            {dataProvide.map(items=>
              <tr>
                <td className={classes.td} >{items.userName}</td>
                <td className={classes.td} >{items.score}</td>
                <td className={classes.td} >{items.date}</td>
              </tr>
            )
            }
          </table>      
        </div>
       }

    </div>  
  );
}
