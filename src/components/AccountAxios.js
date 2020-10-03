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
        url:"/communitymanagement/registration/" + type,
        method: "post",
        data: data,
        
    })
}

export function LogoutRequest(){
    return service.request({
        url:"/communitymanagement/user-logout/",
        method: "get",
    })
}