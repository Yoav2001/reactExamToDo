import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './task.css'
import "bootstrap-icons/font/bootstrap-icons.css";


import homePageComponent from '../homeToDo/HomeToDo'
// import {taskModal} from '../../../../back/modals/taskModal'

type props = {
  task: Task
  deleteTask :(idTask:number) => void 
  updateTask: (task:Task) => void

}





const Task :React.FC<props> =({task ,deleteTask,updateTask}) =>{


      return (

            <div className="taskComponent" >
              <div>
              <button className="btn bi bi-x-square deleteTaskBtn" onClick={()=>deleteTask(task.taskId!)}></button>
            <p>{task.endTime}</p>
              </div>

              <hr/>
              <p>{task.taskName}</p> 

              <br/>
              <div className="divBtnTask">
              <button name='updateTask' className="btn  bi bi-pencil-square"onClick={()=>updateTask(task)} > </button>

                <button className="btn bi bi-check2-square"></button>

              </div>


            </div>

      )

}

export default Task;