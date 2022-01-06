import React from 'react';
import { useState } from 'react';
import { loginAxios, sessionStorageObjectNameToken } from '../../server/auth/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './login.css'


// import {taskModal} from '../../../../back/modals/taskModal'





type logInData = {
  email: string,
  password: string
}





const Login = () => {

  const [user, setUserData] = useState<logInData>({
    email: "",
    password: "",


  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...user,
      [e.target.name]: e.target.value
    });
    console.log(e.target.name)
  }

  const logInToDo = () => {
    if (user.email === "" || user.password === "") {
      alert("user name or passowrd inValid")
    }
    console.log("login function");

    loginAxios(user.email, user.password).then(() => {

      const token = sessionStorage.getItem(sessionStorageObjectNameToken)
      console.log("log in function the token is :", token);

      if (!token) {
        return
      }
      else {
        window.location.href = 'homeToDo';

      }

    })


  }

  return (

    <div className="addToDoForm">
      <p>Log in</p>
      <input
        value={user.email}
        onChange={handleChange}
        name="email"
        type="text"
        className="form-control"
        placeholder="example@gmail.com"
        aria-label="task Name"
        aria-describedby="basic-addon1" />

      <input
        value={user.password}
        onChange={handleChange}
        name="password"
        type="password"
        className="form-control"
        placeholder="password"
        aria-label="task Name"
        aria-describedby="basic-addon1" />

      <button
        className="btn btn-secondary mt-3"
        onClick={() => logInToDo()}  >submit </button>

    </div>

  )

}

export default Login;