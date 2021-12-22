import React from 'react';
import  {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
// import {signUpAxios} from '../../server/signUp'

// import {taskModal} from '../../../../back/modals/taskModal'


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
        // signUpAxios(user).then(()=>{
        //   // location.href='homeToDo';
        // window.location.assign('homeToDo');
        
        // })
        

     }
  
        return (

          <div className="addToDoForm mt-5">
                  
            <p>sign up</p>
          <input value={user.email} onChange={handleChange} name="email"type="text" className="form-control" placeholder="example@gmail.com" aria-label="task Name" aria-describedby="basic-addon1"/> 
          <input value={user.password} onChange={handleChange} name="password"  type="password" className="form-control" placeholder="password" aria-label="task Name" aria-describedby="basic-addon1"/> 
          <input value={user.fullName} onChange={handleChange} name="password"  type="text" className="form-control" placeholder="password" aria-label="task Name" aria-describedby="basic-addon1"/> 

          {/* <input value={user.fullName} onChange={handleChange} name="fullName"  type="text" className="form-control" placeholder="full Name" aria-label="task Name" aria-describedby="basic-addon1"/>  */}
          <br></br>
          <button className="btn btn-secondary" onClick={()=>signUpToDo()}  >submit </button>

        </div>

        )

      }

export default SignUp;