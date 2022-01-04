import React, { useEffect } from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './task.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import homePageComponent from '../homeToDo/HomeToDo'
// import {taskModal} from '../../../../back/modals/taskModal'

type props = {
  task: Task
  isShowCompleteTaskBtn: boolean

  deleteTask: (idTask: number) => void,
  completeTask: (task: Task) => void
  updateTask: (task: Task) => void

}






const Task: React.FC<props> = ({ task, deleteTask, completeTask, updateTask, isShowCompleteTaskBtn }) => {
  

  const [isCheckBoxChecked,setIsCheckBoxChecked] = useState<boolean>(task.isComplete)
  const isTaskOverDue = () => {
    const dateNow: string = new Date(Date.now()).toString()
    const endDate: string = new Date(task.endTime).toString();
    if (Date.parse(dateNow) > Date.parse(endDate)) return true

    return false;
  }

  const getDateTask = (): string => {

    console.log(task.endTime);

    const endDate: Date = new Date(task.endTime)

    const endDateText = `${endDate.getDay()}/${endDate.getMonth()}/${endDate.getFullYear()}`;
    console.log("check date ----- " + endDate.getDay(), endDate.getMonth());
    return endDateText

  }


  const checkBoxClick = () =>{

    setIsCheckBoxChecked(!task.isComplete)   
    updateTask(task);
    
  }
  return (



    <div className={task.isComplete ? "taskComponent completeTaskBackGround" : isTaskOverDue() ? "taskComponent overDueTaskBackGround" : "taskComponent"}   >
      <div>
        <button className="btn bi bi-x-square deleteTaskBtn" onClick={() => deleteTask(task.taskId!)}></button>
        <p>{getDateTask()}</p>
      </div>

      <hr />
      <p>{task.taskName}</p>

      <br />
      <div className="divBtnTask">
        <button name='updateTask' className="btn  bi bi-pencil-square" onClick={() => updateTask(task)} > </button>
      
      {/* {  (isShowCompleteTaskBtn)
           &&
          <input className="form-check-input checkBoxComplete" type="checkbox" onClick={() => completeTask(task)} value="" id="flexCheckDefault" />
      } */}

        {
          (isShowCompleteTaskBtn)
          && <button className={task.isComplete ? "btn bi bi-check-square" : "btn bi bi-square" } onClick={() => completeTask(task)}></button>

        }
           

      </div>


    </div>
  )

}

export default Task;