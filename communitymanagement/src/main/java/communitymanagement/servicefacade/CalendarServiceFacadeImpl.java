package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;
import communitymanagement.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class CalendarServiceFacadeImpl implements CalendarServiceFacade {

    @Autowired
    private TicketService ticketService;

    @Override
    public List<Ticket> getTicketsByUserIdWithTimeRange(int userId, String startDate, String endDate) {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date start = simpleDateFormat.parse(startDate);
            Date end = simpleDateFormat.parse(endDate);
            Timestamp startTimestamp = new Timestamp(start.getTime());
            Timestamp endTimestamp = new Timestamp(end.getTime());
            return ticketService.getTicketsByUserIdWithTimeRange(userId, startTimestamp, endTimestamp);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return null;
    }
}
