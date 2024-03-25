import classes from './option.module.css'
export function Question({label,name,id,aName,oName}){
    
 return<div>
      <label className={classes.label} htmlFor={id}>{label}</label>
      <textarea type="text" name={name} id={id} required  className={classes.textArea} />
      <Option label="A" id={id+"1"} sName={aName} oName={oName+"1"} />
      <Option label="B" id={id+"2"} sName={aName} oName={oName+"2"} />
      <Option label="C" id={id+"3"} sName={aName} oName={oName+"3"} />
      <Option label="D" id={id+"4"} sName={aName} oName={oName+"4"} />
  </div>
}

export  function Option({label,sName,id,oName}){  

    return<div className={classes.questionOption} >  
        <label className={classes.labelOption}>{label}</label>
        <input type="radio" id={id} name={sName} value={oName} className={classes.radioOption}/>
        <input type="text" id={oName} name={oName} required className={classes.inputOption}/>
    </div>
   }

  export function Answer({name,valueQ,index,valueO}){

    let newName=name+index;
    let ind=index*4;
    return<div className={classes.answerOption}>  
        <div className={classes.question}>Q_{index+1}.{valueQ}</div>

        <div className={classes.option}>
            <input type="radio" name={newName} id={newName} value={valueO[ind]} className={classes.radioOption} /> {valueO[ind]} 
        </div>
        <div className={classes.option}>
            <input type="radio" name={newName} id={newName} value={valueO[ind+1]} className={classes.radioOption}/> {valueO[ind+1]} 
        </div>
        <div className={classes.option}>
            <input type="radio" name={newName} id={newName} value={valueO[ind+2] } className={classes.radioOption} /> {valueO[ind+2]} 
        </div>
        <div className={classes.option}>
            <input type="radio" name={newName} id={newName} value={valueO[ind+3]} className={classes.radioOption} /> {valueO[ind+3]} 
        </div>
      </div>
  } 
