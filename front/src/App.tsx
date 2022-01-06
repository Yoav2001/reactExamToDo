import './App.css';
import HomeToDo from './pages/homeToDo/HomeToDo';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import signUpToDo from './pages/signUp/SignUp';
import NavBarAuth from './pages/navBars/NavBarAuth/NavBarAuth';
import NavBarToDo from './pages/navBars/NavBarToDo/NavBarToDo';

function App() {
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
          <Route path="/login"  component={Login }/>
          <Route path="/signUp" component={signUpToDo}/>

          <Route exact path="/homeToDo" component={HomeToDo}/>

        </Switch>
      </Router>
      </div>
  );
}

export default App;
