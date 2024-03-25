import classes from './login.module.css'
export default function Button({name}){
    return <>
        <button className={classes.button}>{name}</button>
    </>
} 