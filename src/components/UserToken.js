const USER_TYPE = "user_type";
const USER_ID = "user_id";

export function setToken(value){
    sessionStorage.setItem(USER_TYPE,value);
    console.log("set user type successfully");
}
export function hasToken(){
    if(sessionStorage.getItem(USER_TYPE)){
        return true;
    }
}
export function getToken(){
   return sessionStorage.getItem(USER_TYPE);
}
export function setUserID(value){
    sessionStorage.setItem(USER_ID,value);
    console.log("set user id successfully");
}
export function getUserID(){
    return sessionStorage.getItem(USER_ID);
}