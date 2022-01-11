
const errorInterceptor = (error: any) => {


    if (!error.response) {
        alert(`there was a server problem `)
        console.log("catch axios login function -error obj is undefined");
    }

    else  {
        const { config, data, status } = error.response
        const { method, baseURL, url } = config
    
   
        console.log(`client has recieved an error  on a ${method}  request  on the url ${baseURL}${url}`);
        console.log(`the status error is ${status} and the message ${data}  `);

        alert(data)

    }


}


export default { errorInterceptor }