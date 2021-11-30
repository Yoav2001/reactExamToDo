import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './task.css'
// import {taskModal} from '../../../../back/modals/taskModal'

type props = {
  task: Task
}




const Task :React.FC<props> =({task}) =>{


return (

    <div className="taskComponent" >
    

      <div className="detailsTak"><p >name task </p>: <p>{task.taskName}</p> </div>

      <div className="detailsTak"><p >date task </p>: <p>{task.endTime}</p> </div>
      <br/>
      <div className="divBtnTask">
       <button className="btn btn-light"> update</button>
        <button className="btn btn-light">complete</button>
      </div>


    </div>

)

}

export default Task;