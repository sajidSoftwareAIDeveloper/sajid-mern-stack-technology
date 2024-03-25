 import Link from 'next/Link';
import Button from './Button';
 import classes from './login.module.css'
 import {useContext, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../store';

 export default function Login() 
  {
    const emailR=useRef();
    const passwordR=useRef();
    const[IsValid,setValid]=useState(false);
    const[wait,settWait]=useState(false);
    const router=useRouter();
    const ctx=useContext(CartContext);
 
    function validateData(email,password){
        if(email.includes('@gmail.com') && password.length>=7){
            return 1;
        }
        else return 0;
    }

   async function loginHandle(event){
        event.preventDefault();
        // check email and password is valid 
       const email=emailR.current.value;
       const  password=passwordR.current.value;
   
        if(validateData(email,password)){
            settWait(true);
           fetch("/api/loginValidate",{
                method:"POST",
                body:JSON.stringify({email,password}),
                headers:{ "Content-Type": "application/json"},
              }
            ).then(res=>res.json())
            .then(res=>{     
                const data=res.message;
                if(data){                       
                    ctx.userNotificationPut({email:data.email,_id:data._id,name:data.name});
                   // console.log(data._id);
                  //  console.log(ctx.userInformationGet.userId);
                   if(ctx.userInformationGet.userId===data._id){
                        router.replace('/components1/home');
                    }
                    setValid(true);
                    settWait(false);
                }else{
                    setValid(true);
                    settWait(false);
                }
            });  
        }else{
            setValid(true);
        }     
    }
    
    return(
    <div className={classes.login}>
        <form onSubmit={loginHandle}>
            <div>
                <label htmlFor='email'>enter email</label> <br/>
                <input 
                type="email" 
                id="email" 
                name="email"
               ref={emailR}
                required />   
            </div>
            <div>
                <label htmlFor='password'>enter password</label> <br/>
                <input 
                type="password" 
                id="password" 
                name="password" 
                ref={passwordR}
                required />
            </div>
            {IsValid && <div>please enter valid email and password </div>}          
          { wait?<p>loading.......</p>: <Button name="login"/>}

        </form>
        <Link href="/components1/newl">  <Button name="new login"/ > </Link>
    </div>);
 }   