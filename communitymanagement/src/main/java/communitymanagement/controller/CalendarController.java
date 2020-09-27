package communitymanagement.controller;

import communitymanagement.model.Ticket;
import communitymanagement.servicefacade.CalendarServiceFacadeImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CalendarController {

    @Autowired
    private CalendarServiceFacadeImpl calendarServiceFacadeImpl;

    @GetMapping("/calendar")
    public List<Ticket> getTicketsByUser(@RequestParam(value = "userId", defaultValue = "100") int userId,
                                            @RequestParam(value = "from", defaultValue = "2000-01-01") String startDate,
                                            @RequestParam(value = "to", defaultValue = "2021-01-01") String endDate) {
        return calendarServiceFacadeImpl.getTicketsByUserIdWithTimeRange(userId, startDate, endDate);
    }
}
