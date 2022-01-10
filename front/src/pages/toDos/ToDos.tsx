import React from 'react';
import Task from '../task/Task';

type props = {
    displayTaskList: Task[],
    deleteTask: (idTask: number) => void,
    completeTask: (task: Task) => void,
    updateTask: (task: Task) => void,
    isShowCompleteTaskBtn: boolean

}


const ToDos: React.FC<props> = ({ displayTaskList, deleteTask, completeTask, updateTask, isShowCompleteTaskBtn }) => {

    return (
        <div >
            {displayTaskList.map(taskItem => {

                return (
                    <Task
                        task={taskItem}
                        key={taskItem.taskId}
                        deleteTask={(idTask:Task["taskId"])=>deleteTask(idTask!)}
                        completeTask={(task:Task)=>completeTask(task)}
                        isShowCompleteTaskBtn={isShowCompleteTaskBtn}
                        updateTask={(task: Task) => { updateTask(task) }} >

                    </Task>
                )

            })}
        </div>
    )
}

export default ToDos;