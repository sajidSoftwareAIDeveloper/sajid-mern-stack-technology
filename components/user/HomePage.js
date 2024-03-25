 import classes from './homepage.module.css'
 import {useContext, useState} from 'react'
 import Profile from './profile';
 import Login from './Login'
import Link from 'next/Link';
import { CartContext } from '../store';
import AddQuestion from '../quiz/AddQuestion';
import Button from './Button'; 
import TestStart from '../quiz/TestStart' 
export default function HomePage(){  
   
    const[isValid,setValid]=useState({  
        pr:false, ts:false, aq:false,
    });
    const ctx=useContext(CartContext);
     //alert(ctx.userInformationGet.userId);
    function handleEffect(identity){
        setValid((items)=>({
            pr:false,ts:false,aq:false,
            [identity]:true,
        }))
    }
       
    return(
        <div>
        {
            ctx.userInformationGet.userId
             &&
           <div className={classes.home} >
              <label>{ctx.userInformationGet.userName}</label>
              <button className={classes.button} onClick={e=>handleEffect('pr')}>profile</button>
              <button className={classes.button} onClick={e=>handleEffect('ts')} >start test</button>
              <button className={classes.button} onClick={e=>handleEffect('aq')} >add Question</button>
              <Link href="/components1/Login"><button className={classes.button}>Login</button></Link>
              <Link href="/components1/out"><button className={classes.button}>LogOut</button></Link>                       </div>
         }

         {
             isValid.aq && < AddQuestion />  
             ||
             isValid.pr && <Profile /> 
             ||
             isValid.ts && <TestStart/>
         }

         {
             !ctx.userInformationGet.userId 
             &&    <Login/> 
            }
          
        </div> 
    )
}        