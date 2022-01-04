import React from 'react';
import  {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import {signUpAxios} from '../../server/auth/signUp'
import "./signUp.css"






const SignUp  =() =>{

    const [user,setUserData] = useState<User>({
      email: "",
      password: "",
      fullName:"",
      isAdmin:false
    

  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
        ...user,
        [e.target.name]: e.target.value
    });
    console.log(e.target.name)
  }

  const signUpToDo =()=>{
        
    if(user.email.length===0||user.password.length===0||user.fullName.length===0){

      alert('ops! you need to fill all the fields')
      return
    }

        signUpAxios(user).then(()=>{
          //למה כשמצליח להירשם לא נכנס לפה
          console.log("sign up succed");
          
         window.location.assign('login');
        
        })
        window.location.assign('login');


     }
  
        return (

          <div className="addToDoForm mt-5">
                  
            <p>sign up</p>
          <input value={user.email} onChange={handleChange} name="email" type="email" className="form-control" placeholder="example@gmail.com" aria-label="task Name" aria-describedby="basic-addon1"/> 
          <input value={user.password} onChange={handleChange} name="password"  type="password" className="form-control" placeholder="password" aria-label="task Name" aria-describedby="basic-addon1"/> 
          <input value={user.fullName} onChange={handleChange} name="fullName"  type="text" className="form-control" placeholder="full name" aria-label="task Name" aria-describedby="basic-addon1"/> 

          {/* <input value={user.fullName} onChange={handleChange} name="fullName"  type="text" className="form-control" placeholder="full Name" aria-label="task Name" aria-describedby="basic-addon1"/>  */}
          <br></br>
          <button className="btn btn-secondary" onClick={()=>signUpToDo()}  >submit </button>

        </div>

        )

      }

export default SignUp;