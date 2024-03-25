import { useContext } from "react"
import { CartContext } from "../../components/store";
import Link from 'next/Link'
import Button from "../../components/user/Button";
export default function welcome(){

    const ctx=useContext(CartContext);
      ctx.userNotificationOut();
 
    return (<>
       <h1> THANKS TO VISIT  HERE </h1>
       <Link href="/components1/Login"><Button name="login"/> </Link>
    </>);
}