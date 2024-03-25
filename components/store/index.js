import { createContext, useState } from "react";


export const CartContext=createContext({
     userInformationGet:null,
     userNotificationPut:function(){},
     userNotificationOut:function(){},
});

export function ContextProvider(props){
    const[u_emailName,setUNEmail]=useState({
        userName:null,
        userEmail:null,
        userId:null,
    });

     function notificationHandle(data){
        setUNEmail({
            userName:data.name,
            userEmail:data.email,
            userId:data._id,
        })
    }
     function notificationOutHandle(){
        setUNEmail({
            userName:null,
            userEmail:null,
            userId:null,
        })
    }

    const context={
        userNotificationPut:notificationHandle,
        userInformationGet:u_emailName,
        userNotificationOut:notificationOutHandle,
    }
    return (
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    );
}