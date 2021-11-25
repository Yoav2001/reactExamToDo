 import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './task.css'
// import {taskModal} from '../../../../back/modals/taskModal'

interface IProps {
  task:Task
}

type Task ={

  taskName: string
  endTime: string
  isComplete:boolean,
  isRelevent :boolean,
}



const Task :React.FC<IProps> =({task}) =>{
  

return (

    <div className="taskComponent">
      <p className="taskName">name task </p>: <h3>{task.taskName}</h3>
      <p>date task </p>: <h3>{task.endTime}</h3>
      <button className="btn btn-info"> add</button>
      <button className="btn btn-info">complete</button>

    </div>

)

}

export default Task;

