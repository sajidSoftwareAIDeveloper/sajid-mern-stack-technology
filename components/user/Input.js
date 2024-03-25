export  function Input({id,name,label,type}){
     
    return<div>
         <label htmlFor={id}>{label}</label> <br/>
         <input type={type} name={name} id={id} required  />
    </div>
}

export function PopUp({id,name,label,setTata}){
    return<div>
       <label htmlFor={id}>{label}</label>
       <select name={name} id={id} required onChange={event=>setTata(event.target.value)} >
        <option value="select">select</option>
         <option value="1">1</option> <option value="2">2</option>
         <option value="3">3</option><option value="4">4</option>
         <option value="5">5</option><option value="6">6</option>
         <option value="7">7</option> <option value="8">8</option>
         <option value="9">9</option><option value="10">10</option>
         <option value="11">11</option> <option value="12">12</option>
         <option value="13">13</option><option value="14">14</option>
         <option value="15">15</option><option value="16">16</option>
         <option value="17">17</option><option value="18">18</option>
         <option value="19">19</option><option value="20">20</option>
         <option value="21">21</option><option value="22">22</option>
         <option value="23">23</option><option value="24">24</option>
         <option value="25">25</option>
       </select>
   </div>
}

