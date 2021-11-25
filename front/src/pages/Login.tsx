
// import 'bootstrap/dist/css/bootstrap.css';
// import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
// import '../../css/login.css'
import React, { useState } from 'react'
// import { IState as Props } from '../../App'
// import { userInfo } from 'os';
// import dataPoc  from '../../data/dataPoc';
// import {useHistory} from 'react-router-dom'
// import { NavBar } from './NavBar';



// interface IProps {
//   setUserList: React.Dispatch<React.SetStateAction<Props["userList"]>>
//   userList: Props["userList"]
// }

// export const Login:React.FC<IProps> =({userList})=>{
//   const history =useHistory();
//     const [input, setInput] = useState({
//         email:"",
//         password:"",
        
//       }) 
      
//       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         console.log("sdfdsfdsfdsf");
    
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         })
//       }
      

      
//       const handleClick = () => {
//         if(!input.email||input.password){
//           const isLogged:boolean= dataPoc.isUserExists(input.email,input.password)
//           if(isLogged)
//             return history.push("/tasks")
//         }
//         history.push("/signUp")
//       }
    
    



//     return (
//       <>
//       <NavBar />
//         <div className="wrapper fadeInDown">
//         <div id="formContent">
      
//           {/* <div className="fadeIn first">
//             <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
//           </div> */}
//           <div>
//             LogIn ToDo
//           </div>

//           <input type="text" onChange={handleChange} name={"email"} value={input.email} className="fadeIn second"  placeholder="email"/>
//           <input type="password" onChange={handleChange} name={"password"} value={input.password} className="fadeIn third"  placeholder="password"/>
//           <input type="submit" onClick={handleClick} className="fadeIn fourth" value="Log In"/>
  
        
      
//         </div>
//       </div>  
//       </>
//         )




// }


