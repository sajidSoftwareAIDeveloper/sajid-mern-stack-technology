 import { useContext } from "react";
import { CartContext } from "../../components/store";
import { useRouter } from "next/router";
import Link from "next/Link";
import Button from "../../components/user/Button";
import Login from './Login'
export default function Complete(){
    const ctx=useContext(CartContext);
    const name=ctx.userInformationGet.userName;
    const router =useRouter();

return<div>
    { (name) ?
    <div>
        <div>
            <h1> HELLO {name} THANKS TO VISITS HERE </h1>         
            <h1>our score :{router.query.score+"%"} </h1>
        </div>
        <Link href="/components1/home"><Button name="home page"/></Link>
    </div> 
    : <Login/>
    }

    </div>
}