import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './task.css'
import "bootstrap-icons/font/bootstrap-icons.css";


import homePageComponent from '../homeToDo/HomeToDo'
// import {taskModal} from '../../../../back/modals/taskModal'

type props = {
  task: Task
  deleteTask :(idTask:number) => void 

}





const Task :React.FC<props> =({task ,deleteTask}) =>{


return (

      <div className="taskComponent" >
        <div>
        <button className="btn bi bi-x-square deleteTaskBtn" onClick={()=>deleteTask(task.id)}></button>
      <p>{task.endTime}</p>
        </div>

         <hr/>
        <p>{task.taskName}</p> 

        <br/>
        <div className="divBtnTask">
        <button className="btn  bi bi-pencil-square"> </button>

          <button className="btn bi bi-check2-square"></button>

        </div>


      </div>

)

}

export default Task;