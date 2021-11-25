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

    <div className="taskComponent" >
    

     <div className="detailsTak"><p >name task </p>: <p>{task.taskName}</p> </div>
     <br/>

      <div> <p>date task </p>: <p>{task.endTime}</p></div>
      <button className="btn btn-info"> add</button>
      <button className="btn btn-info">complete</button>

    </div>

)

}

export default Task;

