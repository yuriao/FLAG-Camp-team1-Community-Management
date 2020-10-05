import service from './RequestInterceptor';

export function CalendarRequest(){
    return service.request({
        url:"/communitymanagement/calendar?from=2020-01-01&to=2021-01-01",
        method: "get",
    })
}