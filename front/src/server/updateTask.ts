
import { baseAxios } from './axiosConfig'


const updateTaskAxios = async (task: Task) => {


    // baseAxios({
    //     method: "PUT",
    //     url: `api/task/${task.taskId}`,
    //     data: {
    //         emailUserOfTask: task.emailUserOfTask,
    //         taskName: task.taskName,
    //         startDate: task.startDate,
    //         endTime: task.endTime,
    //         isComplete: task.isComplete,
    //         isRelevent: task.isRelevent
    //     }
    // }).then((response) => response.data)
    //     .catch((error) => console.log(error.response))




    try {
        await baseAxios({
            method: "PUT",
            url: `api/task/${task.taskId}`,
            data: {
                emailUserOfTask: task.emailUserOfTask,
                taskName: task.taskName,
                startDate: task.startDate,
                endTime: task.endTime,
                isComplete: task.isComplete,
                isRelevent: task.isRelevent
            }
        })

        console.log("axios add new task succed ");


    }
    catch (error: any) {
        console.log("error ");
        console.log(error);
        const statusError = error.response.status;
        const errorMassage = error.response.data.error;

        console.log(`Error - status :${statusError} , ${errorMassage}`);
        if(statusError===400)
        alert("server error (400)")
    }



}

export default updateTaskAxios