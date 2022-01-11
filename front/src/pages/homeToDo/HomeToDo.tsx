import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import ToDos from '../toDos/ToDos';
import { getAllTaskOfUserByEmail } from '../../server/getTaskOfUser'
import addNewTaskAxios from '../../server/addNewTask';
import deleteTaskByTaskIdAxios from '../../server/deleteTask';
import { sessionStorageObjectNameEmail } from '../../server/auth/login';
import UpdateTaskModal from '../modals/updateTaskModal.ts/UpdateTaskModal';
import updateTaskAxios from '../../server/updateTask';
import AcceptOrCancelModal from '../modals/acceptOrCancel/AcceptOrCancel';
import { useHistory } from 'react-router-dom'; // version 5.2.0

import 'bootstrap/dist/css/bootstrap.min.css';
import './homeToDo.css'
import { Tabs } from 'react-bootstrap';


const userEmailSessionStorage = sessionStorage.getItem(sessionStorageObjectNameEmail);


enum TabsOfStateDisplayListTasks {
    allTasks = 1,
    completedTasks = 2,
    overdue = 3
}

const HomeToDo = () => {

    const [allTask, setAllTask] = useState<Task[]>([])
    const [displayListTask, setDisplayList] = useState<Task[]>([])
    const [stateDispalyList, setStateDisplayList] = useState<number>(TabsOfStateDisplayListTasks.allTasks);

    const [isShowCompleteTaskBtn, setIsShowCompleteTaskBtn] = useState<boolean>(true)

    const [taskToAdd, setTask] = useState<Task>({
        taskId: 1,
        emailUserOfTask: userEmailSessionStorage!,
        taskName: "",
        startDate: "12-19-2021",
        endTime: "",
        isComplete: false,
        isRelevent: true
    });

    const nameTaskToAdd = useRef<HTMLInputElement>(null)
    const dateTaskToAdd = useRef<HTMLInputElement>(null)


    const [isShowingUpdateTaskModal, setIsShowingUpdateTaskModal] = useState(false);
    const toggleUpdateTaskModal = () => setIsShowingUpdateTaskModal(!isShowingUpdateTaskModal);
    const [updateTaskObj, setUpdateTaskObj] = useState<Task | undefined>({
        emailUserOfTask: "",
        taskName: "",
        startDate: "",
        endTime: "",
        isComplete: false,
        isRelevent: true

    })

    const [isShowDeleteTaskModal, setIsShowDeleteTaskModal] = useState(false);
    const toggleDeleteTaskModal = () => setIsShowDeleteTaskModal(!isShowDeleteTaskModal);
    const [deleteTaskId, setDeleteTaskId] = useState<Task["taskId"]>(-1);

    useEffect(() => {
        console.log(nameTaskToAdd.current);
    }, [nameTaskToAdd]);

    const getAllTask = async () => {
        setTimeout(() => {
            getAllTaskOfUserByEmail(userEmailSessionStorage!).then((res) => {
                console.log("getting all tasks for user: ", userEmailSessionStorage);
                console.table("all tasks from server: ", res!.data.key);


                const todosOfUser: Task[] = res!.data.key;
                setAllTask(todosOfUser);
            })
         } ,30) 
  
    }

    useEffect(() => {
        console.log("first use effect");
        getAllTask();
    }, [])

    useEffect(() => {
        console.log(" second use effect -use effect display list");
        changeDisplayList(stateDispalyList)
    }, [allTask])






    const addToDo = async () => {

        console.log("use ref" + dateTaskToAdd.current?.value);
        console.log("use ref" + nameTaskToAdd.current?.value);
        const nameTask: string = nameTaskToAdd.current?.value!;
        const dateTask: string = dateTaskToAdd.current?.value!
        console.log(`the name of the task you want to add is  ${nameTask} and date is ${dateTask}`);


        if (nameTask.length === 0 || dateTask.length === 0) {
            alert('soory you need to add task name and date ')
            return
        }

        taskToAdd.endTime = dateTask;
        taskToAdd.taskName = nameTask;
 

        addNewTaskAxios(taskToAdd)
            .then((res) => {
                getAllTask()
            })

            .catch(error => {
            })
    }

    const changeDisplayList = (stateListNumber: number) => {

        setStateDisplayList(stateListNumber)
        switch (stateListNumber) {

            case TabsOfStateDisplayListTasks.allTasks: {
                setDisplayList(allTask)
                setIsShowCompleteTaskBtn(true)
            }
                break;

            case TabsOfStateDisplayListTasks.completedTasks: setDisplayList(allTask.filter(task => task.isComplete))
                setIsShowCompleteTaskBtn(true)

                break;


            case TabsOfStateDisplayListTasks.overdue: setDisplayList(allTask.filter(task => {
                if (task.isComplete) return false
                setIsShowCompleteTaskBtn(false)
                const dateNow: string = new Date(Date.now()).toString()
                const endDate: string = new Date(task.endTime).toString();
                console.log("relvent task :end date ", endDate);
                console.log("relvent task :datenow date ", dateNow);
                if (Date.parse(dateNow) > Date.parse(endDate)) {
                    return true
                }

                else {
                    return false
                }
            }))
                break
        }
    }


    const completeTask = async (task: Task) => {
        task.isComplete = !task.isComplete;
        task.isRelevent = !task.isRelevent;
        updateTaskAxios(task).then(() => { getAllTask() })
    }
    const saveDeleteTask = async (taskId: number) => {
        deleteTaskByTaskIdAxios(taskId).then(() => { getAllTask() })
    }
    const deleteTaskOpenModal = (taskId: number) => {
        setDeleteTaskId(taskId);
        console.log("open modal delete task :", taskId);
        toggleDeleteTaskModal();
    }

    const updateTaskOpenModal = (task: Task) => {
        setUpdateTaskObj(task)
        console.log("open update modal the task is :", task);

        toggleUpdateTaskModal();
    }

    const saveUpdateChanges = async (task: Task) => {
        if (!task) {
            alert('the task is empty - there was problem with update')
            return
        }
        updateTaskAxios(task).then(() => { getAllTask() })
        setUpdateTaskObj(task);

    }

    return (
        <div className="background">
            <div> to do app</div>

            <br></br>
            <div className="input-group mb-3 addToDoForm">
                <input
                    ref={nameTaskToAdd}
                    name="taskName"
                    type="text"
                    className="form-control"
                    placeholder="task Name"
                    aria-label="task Name"
                    aria-describedby="basic-addon1" />

                <input
                    required type="date"
                    ref={dateTaskToAdd}
                    name={"endTime"}
                    className="px-1 form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1" />

                <button
                    className="btn btn-secondary"
                    onClick={()=>addToDo()}
                >add task </button>

            </div>
            <div className="divBtnTask">
                <button
                    className={stateDispalyList === 1 ? "btn btn-primary" : "btn btn-light"}
                    onClick={() => changeDisplayList(TabsOfStateDisplayListTasks.allTasks)}>All
                </button>

                <button
                    className={stateDispalyList === 2 ? "btn btn-primary" : "btn btn-light"}
                    onClick={() => changeDisplayList(TabsOfStateDisplayListTasks.completedTasks)}>
                    completed</button>
                <button
                    className={stateDispalyList === 3 ? "btn btn-primary" : "btn btn-light"}
                    onClick={() => changeDisplayList(TabsOfStateDisplayListTasks.overdue)}> Overdue</button>

            </div>

            <ToDos
                displayTaskList={displayListTask}
                deleteTask={(taskId: Task["taskId"]) => deleteTaskOpenModal(taskId!)}
                completeTask={(task:Task)=>completeTask(task)}
                isShowCompleteTaskBtn={isShowCompleteTaskBtn}
                updateTask={(task: Task) => updateTaskOpenModal(task)}
            />  

            <AcceptOrCancelModal isShowingModal={isShowDeleteTaskModal}
                toggleModal={()=>toggleDeleteTaskModal()}
                headerModalText='Delete Task'
                bodyModalText='are you sure you want to delete task?'
                acceptModalFunction={(taskId: Task["taskId"]) => saveDeleteTask(taskId!)}
                idTaskWhenAcceptModal={deleteTaskId}
            />


            <UpdateTaskModal
                updateTaskObj={updateTaskObj!}
                setUpdateTaskObj={()=>setUpdateTaskObj}
                toggleUpdateTaskModal={()=>toggleUpdateTaskModal()}
                isShowingUpdateTaskModal={isShowingUpdateTaskModal}
                saveUpdateChanges={(task: Task) => saveUpdateChanges(task)}
            />

        </div>
    )
}

export default HomeToDo