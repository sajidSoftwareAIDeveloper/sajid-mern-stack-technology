import { useState } from "react";
import Button from "./Button";
import { Input } from "./Input";
import classes from "./newLogin.module.css";
import { useRouter } from "next/router";

export default function NewLogin() {
  const router = useRouter();
  const [valid ,setValid]=useState(false);
  const [wait ,setWait]=useState(false);
  const [validUniqueEmail ,setValidUniqueEmail]=useState(false);


  function validateData(data) {
    console.log(data);
    const{email,name,password,phone}=data;
    if (email.includes("@") && password.length>=7 && phone.length===10) {
      return 1;
    } else return 0;
  }

  async function Handler(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    // if data is true send login page
    // if ok then send login pag     // email set in store

    if (validateData(data)) {
        setWait(true);
       const res = await fetch("/api/registrationHandle", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json" },
      });
      const data1 = await res.json();
      if (res.ok) {
        if(data1.message){
          router.replace("/components1/Login");   
        } 
        else {setValidUniqueEmail(true); setWait(false);}
       
      } else {
        //alert("message:" + data1.message);
      }
    } else {
      setValid(true);
    }
  }

  return (
    <div>
      <div className={classes.newLogin}>
        <form onSubmit={Handler}>
          <Input label="name" name="name" id="name" type="text"  />
          <Input label=" phone" name="phone" id="phone" type="number" />
          <Input label=" email" name="email" id="email" type="email" />
          {validUniqueEmail && <p>this email is all ready exist please login
             or registration another email </p>}
          <Input label=" password (at lest 7 char)" id="password"  type="password" name="password"  />
           {valid && <h2> please fill above valid information </h2>}
          { wait ? <p> loading.......</p> : <Button name="save" /> }
        </form>
      </div>
    </div>
  );
}
