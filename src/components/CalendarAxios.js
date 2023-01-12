import service from './RequestInterceptor';

export function CalendarRequest(){
    return service.request({
        url:"http://localhost:8081/communitymanagement/calendar?from=2000-01-01&to=2100-01-01",
        method: "get",
        headers:{
            "userid":sessionStorage.user_id
        }
    })
}