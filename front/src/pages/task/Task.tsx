import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './task.css'
import "bootstrap-icons/font/bootstrap-icons.css";



type props = {
  task: Task
  isShowCompleteTaskBtn: boolean

  deleteTask: (idTask: number) => void,
  completeTask: (task: Task) => void
  updateTask: (task: Task) => void

}
//enum value is always a number , in this case i can use map 
enum classOfTask {
  regularTaskCss = 'taskComponent',
  completeTaskClass = 'taskComponent completeTaskBackGround',
  overdueCss = 'taskComponent overDueTaskBackGround'
}




const Task: React.FC<props> = ({ task, deleteTask, completeTask, updateTask, isShowCompleteTaskBtn }) => {


  const isTaskOverDue = () => {
    const dateNow: string = new Date(Date.now()).toString()
    const endDate: string = new Date(task.endTime).toString();
    if (Date.parse(dateNow) > Date.parse(endDate)) return true

    return false;
  }

  const getDateTask = (): string => {
    const endDate: Date = new Date(task.endTime)

    if (endDate.getMonth() < 10) {
      if (endDate.getDate() < 10) {
        return '0' + endDate.getDate() + '/0' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear()
      }
      return endDate.getDate() + '/0' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear()
    }
    if (endDate.getDate() < 10)
      return '0' + endDate.getDate() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear()

    return endDate.getDate() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear()


  }


const getClassOfTask = () => {
  return task.isComplete ? classOfTask.completeTaskClass : isTaskOverDue() ? classOfTask.overdueCss : classOfTask.regularTaskCss;

  // if(task.isComplete)  return classOfTask.completeTaskClass;

  // if(isTaskOverDue()) return classOfTask.overdueCss;

  // return classOfTask.regularTaskCss;
}
  return (



    <div className={getClassOfTask()}   >
      <div className='dateAndDeleteDiv'>
      <p className='dateTask' >{getDateTask()}</p>

          <button
            className="btn bi bi-x-square deleteTaskBtn"
            onClick={() => deleteTask(task.taskId!)}>
          </button>


      </div>

      <hr />
      <p>{task.taskName}</p>

      <br />
      <div className="divBtnTask">

        <button
          name='updateTask'
          className="btn  bi bi-pencil-square"
          onClick={() => updateTask(task)} >
        </button>

        {
          (isShowCompleteTaskBtn)
          && (<button
            className={task.isComplete ? "btn bi bi-check-square" : "btn bi bi-square"}
            onClick={() => completeTask(task)}>
          </button>)

        }
      </div>


    </div>
  )

}

export default Task;