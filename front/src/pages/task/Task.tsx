import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './task.css'
import "bootstrap-icons/font/bootstrap-icons.css";


import homePageComponent from '../homeToDo/HomeToDo'
// import {taskModal} from '../../../../back/modals/taskModal'

type props = {
  task: Task
  isShowCompleteTaskBtn: boolean

  deleteTask :(idTask:number) => void ,
  completeTask:(task:Task) => void
  updateTask: (task:Task) => void

}




const Task :React.FC<props> =({task ,deleteTask,completeTask,updateTask,isShowCompleteTaskBtn}) =>{


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
              <button name='updateTask' className="btn  bi bi-pencil-square" onClick={()=>updateTask(task)} > </button>


                {
                  (isShowCompleteTaskBtn)
                  && <button className="btn bi bi-check2-square"onClick={()=>completeTask(task)}></button>

                }
                
              </div>


            </div>

      )

}

export default Task;