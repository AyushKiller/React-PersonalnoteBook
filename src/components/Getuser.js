import React,{useState,useEffect} from 'react'
import UserBody from './UserBody'

const Getuser = (props) => {
   const[getuser,SetGetuser]=useState([]);
    const handleSubmit = async () => {
       
        const response = await fetch("http://localhost:3005/api/auth/getuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify()
        });
        const json =await response.json();
        console.log(json);
        SetGetuser(json)
    }
    useEffect(() => {
      handleSubmit(); 
      //eslint-disable-next-line
  
  }, [])
  return (<>
    <div className="container my-3" >
       <div className='row'>
       {getuser?.map((id,index)=>{
         return  <div className="col-md-4" key={index}>
         <h2>{id.id}|{id.name}</h2> 
           {/* <button onClick={handleSubmit} type="button" className="btn btn-primary">get user detail</button> */}
         </div>    
    }
    )}
  </div>  
  </div>
  </>
  )

}

export default Getuser
