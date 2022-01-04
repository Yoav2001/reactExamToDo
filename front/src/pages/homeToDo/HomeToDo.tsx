import React, { useEffect } from 'react';
import { useState } from 'react';

import ToDos from '../toDos/ToDos';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homeToDo.css'
// import dataTask from '../../data/dataTask';
import { getAllTaskOfUserByEmail } from '../../server/getTaskOfUser'
import addNewTaskAxios from '../../server/addNewTask';
import deleteTaskByTaskIdAxios from '../../server/deleteTask';
import { sessionStorageObjectNameEmail } from '../../server/auth/login';
import { Modal, ModalBody } from 'reactstrap';
import Task from '../task/Task';
import UpdateTaskModal from '../modals/updateTaskModal.ts/UpdateTaskModal';
import updateTaskAxios from '../../server/updateTask';
import AcceptOrCancelModal from '../modals/acceptOrCancel/AcceptOrCancel';
const userEmailSessionStorage = sessionStorage.getItem(sessionStorageObjectNameEmail);
const statesDisaplyTasks = new Map();

statesDisaplyTasks.set(1, 'allTasks');
statesDisaplyTasks.set(2, 'completedTasks');
statesDisaplyTasks.set(3, 'releventTasks');

// export interface IStateTasks {
//     taskList: Task[]

//   }


const HomeToDo = () => {

    const [allTask, setAllTask] = useState<Task[]>([])
    const [displayListTask, setDisplayList] = useState<Task[]>([])
    const [stateDispalyList, setStateDisplayList] = useState<number>(1);

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


    const getAllTask = async () => {
        setTimeout(() => {
            getAllTaskOfUserByEmail(userEmailSessionStorage!).then((res) => {
                console.log("getting all tasks for user: ", userEmailSessionStorage);
                console.table("all tasks from server: ", res.data.key);


                const todosOfUser: Task[] = res.data.key;
                setAllTask(todosOfUser);
            })
        }, 30);
    }

    useEffect(() => {
        console.log("first use effect");
        getAllTask();

        // getAllTaskOfUserByEmail(userEmailSessionStorage!).then((res) => {
        // const todosOfUser:Task[]=res.data.key;
        // setAllTask(todosOfUser)
        // setStateDisplayList(1);
    }, [])

    useEffect(() => {
        console.log(" second use effect -use effect display list");
        changeDisplayList(stateDispalyList)
    }, [allTask])




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setTask({
            ...taskToAdd,
            [e.target.name]: e.target.value
        });
        console.log(e.target.name)
    }

    const addToDo = async () => {
        if (taskToAdd.taskName.length === 0 || taskToAdd.endTime.length === 0) {
            alert('soory you need to add task name and date ')
            return
        }
        console.log("add to do dsfsdfsdf");
        
        console.log("date now" +new Date(Date.now()).toString());
        
        addNewTaskAxios(taskToAdd)
            .then((res) => {
                getAllTask()
            })

            .catch(error => {
            })
    }

    const changeDisplayList = (stateListNumber: number) => {

        setStateDisplayList(stateListNumber)
        switch (statesDisaplyTasks.get(stateListNumber)) {

            case 'allTasks': {
                setDisplayList(allTask)
                setIsShowCompleteTaskBtn(true)
            }
                break;

            case 'completedTasks': setDisplayList(allTask.filter(task => task.isComplete))
                setIsShowCompleteTaskBtn(true)

                break;


            case 'releventTasks': setDisplayList(allTask.filter(task => {
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
        console.log("open modal the task is :", task);

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
                <input value={taskToAdd.taskName} onChange={handleChange} name="taskName" type="text" className="form-control" placeholder="task Name" aria-label="task Name" aria-describedby="basic-addon1" />
                <input required type="date" defaultValue={taskToAdd.endTime} onChange={handleChange} name={"endTime"} className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                <button className="btn btn-secondary" onClick={addToDo} >add task </button>

            </div>
            <div className="divBtnTask">
                <button className={stateDispalyList === 1 ? "btn btn-primary" : "btn btn-light"} onClick={() => changeDisplayList(1)}>All</button>

                <button className={stateDispalyList === 2 ? "btn btn-primary" : "btn btn-light"} onClick={() => changeDisplayList(2)}>completed</button>
                <button className={stateDispalyList === 3 ? "btn btn-primary" : "btn btn-light"} onClick={() => changeDisplayList(3)}> Overdue</button>

            </div>

            <ToDos displayTaskList={displayListTask} deleteTask={(taskId: Task["taskId"]) => deleteTaskOpenModal(taskId!)} completeTask={completeTask} isShowCompleteTaskBtn={isShowCompleteTaskBtn} updateTask={(task: Task) => updateTaskOpenModal(task)} ></ToDos>
            <AcceptOrCancelModal isShowingModal={isShowDeleteTaskModal} toggleModal={toggleDeleteTaskModal} headerModalText='Delete Task' bodyModalText='are you sure you want to delete task?' acceptModalFunction={(taskId: Task["taskId"]) => saveDeleteTask(taskId!)} idTaskWhenAcceptModal={deleteTaskId} />
            <UpdateTaskModal updateTaskObj={updateTaskObj!} setUpdateTaskObj={setUpdateTaskObj} toggleUpdateTaskModal={toggleUpdateTaskModal} isShowingUpdateTaskModal={isShowingUpdateTaskModal} saveUpdateChanges={(task: Task) => saveUpdateChanges(task)} />
        </div>
    )
}

export default HomeToDo