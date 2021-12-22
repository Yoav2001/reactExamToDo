import React from 'react';
import './App.css';
import dataTask from './data/dataTask';
import HomeToDo from './pages/homeToDo/HomeToDo';
import Login from './pages/login/Login';
import Task from './pages/task/Task'
import ToDos from './pages/toDos/ToDos';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Auth from './pages/auth/Auth';
import signUpToDo from './pages/signUp/SignUp';
import NavBarAuth from './pages/navBars/NavBarAuth/NavBarAuth';
import NavBarToDo from './pages/navBars/NavBarToDo/NavBarToDo';

function App() {
  const user =true;
  const pathCurrentPage=window.location.pathname;
  return (

    <div className="App">

      {(pathCurrentPage.includes("login")||pathCurrentPage.includes("signUp"))
      
      &&<NavBarAuth/>
      }
         {window.location.pathname.includes("homeToDo")
      
      &&<NavBarToDo/>
      }
      <Router>
        <Switch>
          {/* <Route exact path='/' component={user ? Login : Login}/> */}
          <Route path="/login"  component={Login }/>
          <Route path="/signUp" component={signUpToDo}/>

          <Route exact path="/homeToDo" component={HomeToDo}/>

        </Switch>
      </Router>
      </div>
  );
}

export default App;
