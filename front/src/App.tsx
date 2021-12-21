import React from 'react';
import './App.css';
import dataTask from './data/dataTask';
import HomeToDo from './pages/homeToDo/HomeToDo';
import Login from './pages/login/Login';
import Task from './pages/task/Task'
import ToDos from './pages/toDos/ToDos';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Auth from './pages/auth/Auth';

function App() {
  const user =true;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={user ? Login : Login}/>
          <Route path="/login" component={Login}/>
          <Route exact path="/homeToDo" component={HomeToDo}/>

        </Switch>
      </Router>
      </div>
  );
}

export default App;
