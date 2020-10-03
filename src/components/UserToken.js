const tokenAdmin = "adminToken";


export function setToken(value){
    sessionStorage.setItem(tokenAdmin,value);
}
export function getToken(){
    if(sessionStorage.getItem(tokenAdmin) == 200){
        return true;
    }
}