import service from './RequestInterceptor';

export function LoginRequest(data){
    return service.request({  //返回给调用此方法的caller
        url:"/communitymanagement/login/",
        method: "post",
        data: data,
       
    })
}

// export function RegisterRequest(data){
//     return service.request({  //返回给调用此方法的caller
//         url:"/register/",
//         method: "post",
//         data: data,
        
//     })
// }

export function RegisterRequest(data,type){
    return service.request({  //返回给调用此方法的caller
<<<<<<< HEAD
        url:"/communitymanagement/registration/" + type,
=======
        url:"communitymanagement/registration/" + type,
>>>>>>> 92e987e0... 20:47
        method: "post",
        data: data,
        
    })
}